import { useState, useEffect } from "react";
import { ComboboxItem } from "@/components/LocationCombobox";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

const reqCache = new Map<string, any>();

export function useLocationAPIs() {
  const [states, setStates] = useState<ComboboxItem[]>([]);
  const [statesLoading, setStatesLoading] = useState(false);
  
  const [cities, setCities] = useState<ComboboxItem[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  
  const [institutions, setInstitutions] = useState<ComboboxItem[]>([]);
  const [instLoading, setInstLoading] = useState(false);

  const placesLib = useMapsLibrary("places");
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    if (placesLib) {
      setAutocompleteService(new placesLib.AutocompleteService());
    }
  }, [placesLib]);

  // Load States initially
  useEffect(() => {
    const fetchStates = async () => {
      const cacheKey = "states";
      if (reqCache.has(cacheKey)) {
        setStates(reqCache.get(cacheKey));
        return;
      }
      setStatesLoading(true);
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India" }),
        });
        const data = await res.json();
        if (!data.error) {
          const formatted = data.data.states.map((s: any) => ({
            value: s.name,
            label: s.name,
          }));
          reqCache.set(cacheKey, formatted);
          setStates(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch states", err);
      } finally {
        setStatesLoading(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch Cities when a state is selected
  const fetchCities = async (stateName: string) => {
    if (!stateName) {
      setCities([]);
      return;
    }
    const cacheKey = `cities_${stateName}`;
    if (reqCache.has(cacheKey)) {
      setCities(reqCache.get(cacheKey));
      return;
    }
    setCitiesLoading(true);
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "India", state: stateName }),
      });
      const data = await res.json();
      if (!data.error) {
        const formatted = data.data.map((c: string) => ({
          value: c,
          label: c,
        }));
        reqCache.set(cacheKey, formatted);
        setCities(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch cities", err);
    } finally {
      setCitiesLoading(false);
    }
  };

  // Fetch Colleges mapping and places autocomplete
  const fetchInstitutions = async (query: string, cityName: string) => {
    if (!query) {
      setInstitutions([]);
      return;
    }
    setInstLoading(true);

    try {
      let colleges: ComboboxItem[] = [];
      try {
        // 1. Fetch Colleges from Universities API
        const uRes = await fetch(`https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country=India&name=${encodeURIComponent(query)}`)
          .catch(() => fetch(`http://universities.hipolabs.com/search?country=India&name=${encodeURIComponent(query)}`));
        
        if (uRes.ok) {
          const uData = await uRes.json();
          colleges = uData.slice(0, 5).map((u: any) => ({
            value: `college_${u.name}`,
            label: u.name,
            group: "Colleges"
          }));
        }
      } catch (e) {
        console.error("College fetch error:", e);
      }

      // 2. Fetch Places from Google Autocomplete if available
      let offices: ComboboxItem[] = [];
      try {
        if (autocompleteService && cityName) {
          // Broaden the search by passing the city name optionally
          const request = {
            input: `${query} in ${cityName}`,
            componentRestrictions: { country: "in" },
            types: ["establishment"]
          };
          const res = await new Promise<google.maps.places.AutocompletePrediction[] | null>((resolve) => {
            autocompleteService.getPlacePredictions(request, (predictions, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                resolve(predictions);
              } else {
                resolve(null);
              }
            });
          });

          if (res) {
            offices = res.slice(0, 5).map(p => ({
              value: `office_${p.place_id}`,
              label: p.structured_formatting.main_text,
              group: "Offices & Tech Parks"
            }));
          }
        }
      } catch (e) {
        console.error("Office fetch error:", e);
      }

      setInstitutions([...colleges, ...offices]);
    } catch (err) {
      console.error("Institutions global catch:", err);
    } finally {
      setInstLoading(false);
    }
  };

  return {
    states,
    statesLoading,
    cities,
    citiesLoading,
    fetchCities,
    institutions,
    instLoading,
    fetchInstitutions,
  };
}
