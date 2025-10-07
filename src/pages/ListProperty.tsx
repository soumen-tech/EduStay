import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ArrowLeft, Upload } from "lucide-react";
import { toast } from "sonner";

const ListProperty = () => {
  const navigate = useNavigate();
  const [propertyName, setPropertyName] = useState("");
  const [type, setType] = useState("");
  const [rent, setRent] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState({
    wifi: false,
    meals: false,
    attached: false,
    laundry: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your property has been submitted for admin review!");
    navigate("/owner/dashboard");
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EduStay</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/owner/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle className="text-2xl">List Your Property</CardTitle>
            <CardDescription>
              Fill in the details to list your property on EduStay
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="propertyName">Property Name *</Label>
                <Input
                  id="propertyName"
                  placeholder="e.g., ABC Residency PG"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Property Type *</Label>
                <Select value={type} onValueChange={setType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="pg">PG</SelectItem>
                    <SelectItem value="mess">Mess</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rent">Monthly Rent (₹) *</Label>
                <Input
                  id="rent"
                  type="number"
                  placeholder="e.g., 4500"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label>Facilities</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wifi"
                      checked={facilities.wifi}
                      onCheckedChange={(checked) =>
                        setFacilities({ ...facilities, wifi: checked as boolean })
                      }
                    />
                    <Label htmlFor="wifi" className="font-normal cursor-pointer">
                      Wi-Fi
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="meals"
                      checked={facilities.meals}
                      onCheckedChange={(checked) =>
                        setFacilities({ ...facilities, meals: checked as boolean })
                      }
                    />
                    <Label htmlFor="meals" className="font-normal cursor-pointer">
                      Meals Included
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="attached"
                      checked={facilities.attached}
                      onCheckedChange={(checked) =>
                        setFacilities({ ...facilities, attached: checked as boolean })
                      }
                    />
                    <Label htmlFor="attached" className="font-normal cursor-pointer">
                      Attached Bathroom
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="laundry"
                      checked={facilities.laundry}
                      onCheckedChange={(checked) =>
                        setFacilities({ ...facilities, laundry: checked as boolean })
                      }
                    />
                    <Label htmlFor="laundry" className="font-normal cursor-pointer">
                      Laundry Service
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Info *</Label>
                <Input
                  id="contact"
                  type="tel"
                  placeholder="e.g., +91 98765 43210"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Property Image</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    (Demo - File upload is not functional)
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Submit Property
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ListProperty;
