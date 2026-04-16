import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Search as SearchIcon, Home, Briefcase, GraduationCap, Clock, Crosshair } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { Map, useMapsLibrary, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";

interface SavedLocation {
  id: string;
  label: string;
  iconType: string;
  address: string;
}

interface LocationProps {
  currentLocation: string;
  onLocationSelect: (location: string) => void;
  preventNavigation?: boolean;
  className?: string;
}

const DEFAULT_CENTER = { lat: 22.800, lng: 88.402 }; // Approximate AOT Region

const LocationSearchPopover = ({ currentLocation, onLocationSelect, preventNavigation = false, className }: LocationProps) => {
  const [open, setOpen] = useState(false);
  const [queryText, setQueryText] = useState("");
  const { currentUser } = useAuth();
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  
  // Google maps APIs
  const placesLib = useMapsLibrary("places");
  const geocodingLib = useMapsLibrary("geocoding");
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [pinAddress, setPinAddress] = useState("Loading location...");
  
  const navigate = useNavigate();

  useEffect(() => {
    if (placesLib) {
      setAutocompleteService(new placesLib.AutocompleteService());
      setPlacesService(new placesLib.PlacesService(document.createElement("div")));
    }
    if (geocodingLib) {
      setGeocoder(new geocodingLib.Geocoder());
    }
  }, [placesLib, geocodingLib]);

  useEffect(() => {
    if (!currentUser) {
      setSavedLocations([]);
      return;
    }
    const q = query(
      collection(db, "users", currentUser.uid, "savedLocations"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const locs: SavedLocation[] = [];
      snapshot.forEach(doc => locs.push({ id: doc.id, ...doc.data() } as SavedLocation));
      setSavedLocations(locs);
    });
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!autocompleteService || !queryText) {
      setPredictions([]);
      return;
    }
    const fetchPredictions = async () => {
      try {
        const response = await autocompleteService.getPlacePredictions({ input: queryText });
        setPredictions(response.predictions);
      } catch (error) {
        setPredictions([]);
      }
    };
    fetchPredictions();
  }, [queryText, autocompleteService]);

  // Reverse geocode the center when it stops panning
  useEffect(() => {
    if (!geocoder) return;
    
    // Simple debounce
    const timeout = setTimeout(() => {
      geocoder.geocode({ location: mapCenter }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          // Format elegantly
          let addressStr = results[0].formatted_address;
          // Extract a shorter logical name if possible 
          if(results[0].address_components) {
              const locality = results[0].address_components.find(c => c.types.includes('locality'));
              const subloc = results[0].address_components.find(c => c.types.includes('sublocality'));
              const neighborhood = results[0].address_components.find(c => c.types.includes('neighborhood'));
              
              const primary = neighborhood || subloc || locality;
              const secondary = subloc && locality ? locality : null;
              
              if (primary && secondary && primary.short_name !== secondary.short_name) {
                 addressStr = `${primary.short_name}, ${secondary.short_name}`;
              } else if (primary) {
                 addressStr = primary.short_name;
              }
          }
          setPinAddress(addressStr);
        } else {
          setPinAddress("Unknown Location");
        }
      });
    }, 400); // 400ms debounce
    return () => clearTimeout(timeout);
  }, [mapCenter, geocoder]);

  const handleSelectPlace = (placeId: string, description: string) => {
    if (!placesService) return;
    
    placesService.getDetails({ placeId, fields: ["geometry", "name"] }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMapCenter({ lat, lng });
        setQueryText(""); // Close suggestions by clearing search
      }
    });
  };

  const handleSelectSaved = (loc: SavedLocation) => {
    setOpen(false);
    onLocationSelect(loc.label);
    if (!preventNavigation) {
      navigate(`/find-accommodation?location=${encodeURIComponent(loc.label)}`);
    }
  };

  const confirmLocation = () => {
    setOpen(false);
    onLocationSelect(pinAddress);
    if (!preventNavigation) {
      navigate(`/find-accommodation?lat=${mapCenter.lat}&lng=${mapCenter.lng}&location=${encodeURIComponent(pinAddress)}`);
    }
  };

  const handleCameraChanged = (ev: MapCameraChangedEvent) => {
    setMapCenter(ev.detail.center);
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "home": return <Home className="h-4 w-4" />;
      case "office": return <Briefcase className="h-4 w-4" />;
      case "university": return <GraduationCap className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={`flex items-center gap-2 flex-1 px-4 py-2 border-r border-border/15 cursor-pointer group/loc ${className || ''}`} role="button">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0 group-hover/loc:scale-110 transition-transform duration-200" />
          <span className="text-sm font-body text-muted-foreground group-hover/loc:text-foreground transition-colors duration-200 line-clamp-1 text-left flex-1" style={{minWidth:"120px"}}>
            {currentLocation || "Location... (e.g. University)"}
          </span>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-xl w-[95vw] p-0 overflow-hidden rounded-3xl flex flex-col h-[85vh] max-h-[850px] border-0 shadow-2xl">
        
        {/* Search Header overlaid on map for space efficiency */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 pb-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none">
          <div className="pointer-events-auto bg-background/95 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-white/20 transition-all duration-300">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
              <SearchIcon className="h-5 w-5 text-primary shrink-0" />
              <input
                type="text"
                placeholder="Search university, office, city..."
                className="w-full bg-transparent border-none outline-none text-base font-body text-foreground placeholder:text-muted-foreground/70 h-8"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
              />
            </div>
            
            {/* Expanded Predictions / Saved Locations */}
            {(queryText || savedLocations.length > 0) && (
              <div className="max-h-[35vh] overflow-y-auto bg-background/95">
                {queryText ? (
                  predictions.length > 0 ? (
                    predictions.map(pred => (
                      <div
                        key={pred.place_id}
                        className="px-4 py-3 hover:bg-accent/60 cursor-pointer flex items-start gap-3 border-b border-border/20 last:border-0 transition-colors"
                        onClick={() => handleSelectPlace(pred.place_id, pred.description)}
                      >
                        <MapPin className="h-5 w-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-display font-medium text-foreground truncate">{pred.structured_formatting.main_text}</p>
                          <p className="text-xs font-body text-muted-foreground truncate">{pred.structured_formatting.secondary_text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-sm font-body text-muted-foreground flex flex-col items-center">
                       <MapPin className="h-8 w-8 text-muted-foreground/30 mb-2" />
                       No places found.
                    </div>
                  )
                ) : (
                   <div className="py-2 pb-3">
                     <div className="px-4 py-2 flex items-center gap-2 mb-1">
                       <Clock className="h-3.5 w-3.5 text-primary" />
                       <span className="text-[11px] font-body font-bold text-primary tracking-widest uppercase">Saved Locations</span>
                     </div>
                     <div className="grid grid-cols-1 gap-1 px-2">
                       {savedLocations.map(loc => (
                         <div
                           key={loc.id}
                           className="px-3 py-2.5 rounded-xl hover:bg-accent/60 cursor-pointer flex items-center gap-3 group transition-all"
                           onClick={() => handleSelectSaved(loc)}
                         >
                           <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm transition-all duration-300">
                             {getIcon(loc.iconType)}
                           </div>
                           <div className="flex-1 min-w-0">
                             <p className="text-sm font-display font-medium text-foreground truncate">{loc.label}</p>
                             <p className="text-xs font-body text-muted-foreground truncate">{loc.address}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Map Area */}
        <div className="relative flex-1 bg-muted/30">
          <Map
            mapId="DEMO_MAP_ID"
            defaultZoom={15}
            center={mapCenter}
            disableDefaultUI={true}
            gestureHandling="greedy"
            keyboardShortcuts={false}
            onCameraChanged={handleCameraChanged}
          />
          
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* Center Map Pin with shadow */}
            <div className="relative pb-8 transition-transform duration-200 transform scale-110">
               <MapPin className="h-10 w-10 text-primary fill-primary drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] z-10 relative" strokeWidth={1} />
               <div className="absolute w-5 h-2 bg-black/30 blur-[2px] rounded-[100%] bottom-6 left-1/2 -translate-x-1/2"></div>
            </div>
            {/* Target outline for precision precision */}
            <Crosshair className="absolute h-12 w-12 text-primary/20 pointer-events-none" strokeWidth={1} />
          </div>
        </div>

        {/* Bottom Action Sheet */}
        <div className="bg-background pt-5 pb-6 px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] z-20 rounded-t-3xl sm:rounded-none relative -mt-4">
           {/* Drag handle line just for aesthetics */}
           <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-muted rounded-full"></div>
           
           <p className="text-xs font-body font-bold text-muted-foreground uppercase tracking-wider mb-1 mt-1">Select Location</p>
           <div className="flex items-start gap-2 mb-5">
              <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
              <h3 className="text-xl font-display font-semibold text-foreground line-clamp-2">
                 {pinAddress}
              </h3>
           </div>
           
           <Button onClick={confirmLocation} size="lg" className="w-full h-14 text-base font-semibold shadow-xl shadow-primary/25 rounded-2xl">
             Confirm Location
           </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default LocationSearchPopover;
