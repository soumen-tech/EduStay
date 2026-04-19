import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Upload, Building2 } from "lucide-react";
import { toast } from "sonner";

export const AddPropertyTab = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const amenitiesList = [
    { id: "wifi", label: "High-Speed WiFi" },
    { id: "food", label: "Homely Meals" },
    { id: "laundry", label: "Laundry Service" },
    { id: "ac", label: "Air Conditioning" },
    { id: "cleaning", label: "Daily Cleaning" },
    { id: "security", label: "24/7 Security" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement actual submission to Firestore properties collection
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Property added successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Add New Property</h2>
          <p className="text-sm text-slate-500">Register a new unit under your management umbrella.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="propName">Property Name</Label>
              <Input id="propName" placeholder="e.g. The Emerald Suite" required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rent">Monthly Rent (₹)</Label>
                <Input id="rent" type="number" placeholder="24500" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type</Label>
                <Select required>
                  <SelectTrigger id="roomType">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Room</SelectItem>
                    <SelectItem value="double">Double Sharing</SelectItem>
                    <SelectItem value="triple">Triple Sharing</SelectItem>
                    <SelectItem value="flat">Entire Flat/Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Location & Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Input id="address" placeholder="42nd Verdant Path, North Sector" required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Bangalore" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Karnataka" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landmark">Nearby College/Office</Label>
                <Input id="landmark" placeholder="Tech Park / University" required />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label>Location Map Picker</Label>
              <div className="h-48 bg-slate-100 rounded-md border border-slate-200 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-200 transition">
                <MapPin className="w-8 h-8 mb-2 text-emerald-500" />
                <span className="font-medium">Click to set location on map</span>
                <span className="text-xs mt-1">(Map integration placeholder)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Amenities & Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Included Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenitiesList.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox id={amenity.id} />
                    <label
                      htmlFor={amenity.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <Label>Property Images</Label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <p className="text-sm font-medium text-slate-700">Click to upload images or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[150px]" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Initialize Setup"}
          </Button>
        </div>
      </form>
    </div>
  );
};
