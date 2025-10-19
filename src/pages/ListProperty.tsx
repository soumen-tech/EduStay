import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, ArrowLeft, Upload } from "lucide-react";
import { toast } from "sonner";

const ListProperty = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [step, setStep] = useState(1);
  
  const [propertyName, setPropertyName] = useState("");
  const [type, setType] = useState("");
  const [rent, setRent] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [capacity, setCapacity] = useState("");
  const [facilities, setFacilities] = useState({
    wifi: false,
    meals: false,
    attached: false,
    laundry: false,
  });

  useEffect(() => {
    // Demo: Check if user is logged in (in production, check actual auth state)
    const userLoggedIn = localStorage.getItem("isOwnerLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
    
    if (!userLoggedIn) {
      setShowLoginModal(true);
    }
  }, []);

  const handleLoginRedirect = (type: "login" | "signup") => {
    navigate(`/owner/${type}`);
  };

  const handleNextStep = () => {
    if (step < 6) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your property has been submitted for admin review!");
    navigate("/owner/dashboard");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-secondary">
        <header className="bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EduStay</span>
            </Link>
          </div>
        </header>

        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login Required</DialogTitle>
              <DialogDescription>
                You need to be logged in as a property owner to list your property. 
                This ensures verification and ownership validation.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-4">
              <Button onClick={() => handleLoginRedirect("login")} className="w-full">
                Login to Continue
              </Button>
              <Button onClick={() => handleLoginRedirect("signup")} variant="outline" className="w-full">
                Create Owner Account
              </Button>
              <Button onClick={() => navigate("/")} variant="ghost" className="w-full">
                Go to Home
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
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

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div key={s} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  s <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {s}
                </div>
                <span className="text-xs mt-1 hidden md:block">
                  {s === 1 && "Basic"}
                  {s === 2 && "Address"}
                  {s === 3 && "Photos"}
                  {s === 4 && "Amenities"}
                  {s === 5 && "Documents"}
                  {s === 6 && "Review"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-hover">
          <CardHeader>
            <CardTitle className="text-2xl">List Your Property - Step {step} of 6</CardTitle>
            <CardDescription>
              {step === 1 && "Basic property details"}
              {step === 2 && "Address and location"}
              {step === 3 && "Upload property photos"}
              {step === 4 && "Amenities and pricing"}
              {step === 5 && "Verification documents"}
              {step === 6 && "Review and submit"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Details */}
              {step === 1 && (
                <>
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
                    <Label htmlFor="gender">Gender Policy *</Label>
                    <Select value={gender} onValueChange={setGender} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boys">Boys Only</SelectItem>
                        <SelectItem value="girls">Girls Only</SelectItem>
                        <SelectItem value="both">Both Boys and Girls</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Max Capacity *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="e.g., 10"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {/* Step 2: Address */}
              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter complete address..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      📍 Demo: Map pin auto-geocoding would appear here
                    </p>
                  </div>
                </>
              )}

              {/* Step 3: Photos */}
              {step === 3 && (
                <div className="space-y-4">
                  <Label>Property Images (Minimum 4 required) *</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (Demo - File upload is not functional)
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload clear, well-lit photos of rooms, common areas, and facilities
                  </p>
                </div>
              )}

              {/* Step 4: Amenities & Pricing */}
              {step === 4 && (
                <>
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
                    <Label htmlFor="description">Property Description</Label>
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
                    <div className="grid grid-cols-2 gap-3">
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
                    <Label htmlFor="contact">Contact Number *</Label>
                    <Input
                      id="contact"
                      type="tel"
                      placeholder="e.g., +91 98765 43210"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {/* Step 5: Documents */}
              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <Label>Aadhaar Card (Front & Back) *</Label>
                    <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">(Demo upload)</p>
                    </div>
                  </div>
                  <div>
                    <Label>Property Ownership Proof *</Label>
                    <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">(Demo upload)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {step === 6 && (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <h3 className="font-semibold">Property Summary</h3>
                    <p className="text-sm"><strong>Name:</strong> {propertyName || "Not set"}</p>
                    <p className="text-sm"><strong>Type:</strong> {type || "Not set"}</p>
                    <p className="text-sm"><strong>Gender:</strong> {gender || "Not set"}</p>
                    <p className="text-sm"><strong>Capacity:</strong> {capacity || "Not set"}</p>
                    <p className="text-sm"><strong>Rent:</strong> ₹{rent || "Not set"}/month</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                      I agree to the terms and conditions and confirm that all information provided is accurate
                    </Label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                )}
                {step < 6 ? (
                  <Button type="button" onClick={handleNextStep} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto">
                    Submit for Review
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ListProperty;
