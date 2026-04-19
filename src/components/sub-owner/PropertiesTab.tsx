import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Edit, Trash2, Eye } from "lucide-react";

interface PropertiesTabProps {
  properties: any[];
}

export const PropertiesTab = ({ properties }: PropertiesTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800">My Properties</h2>
          <p className="text-sm text-slate-500">Manage your active and inactive properties</p>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500">No properties found. Add a property to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="h-48 bg-slate-200 relative overflow-hidden">
                {property.images && property.images.length > 0 ? (
                  <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                    No Image
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className={`px-2 py-1 ${property.status === 'Full' ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}>
                    {property.status || "Available"}
                  </Badge>
                  <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-none shadow-sm text-slate-800">
                    {property.room_type || "PG"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1">{property.name}</h3>
                <div className="flex items-start gap-1.5 text-slate-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{property.address}, {property.city}</span>
                </div>
                <div className="flex justify-between items-end border-t border-slate-100 pt-4 mt-2">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">MONTHLY RENT</p>
                    <p className="font-bold text-lg text-emerald-600">₹{property.rent?.toLocaleString() || "N/A"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
