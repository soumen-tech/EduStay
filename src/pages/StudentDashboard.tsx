import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Heart, MessageSquare, LogOut } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { toast } from "sonner";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");

  const savedProperties = [
    {
      id: 1,
      image: room1,
      name: "Ghosh Residency PG",
      price: 4500,
      distance: "800m",
      type: "PG",
      facilities: ["Wi-Fi", "Meals"],
      owner: "Mr. S. Ghosh"
    },
    {
      id: 2,
      image: room2,
      name: "Mitra Boys Hostel",
      price: 4000,
      distance: "1km",
      type: "Hostel",
      facilities: ["Wi-Fi"],
      owner: "Mrs. Mitra"
    }
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your feedback!");
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EduStay</span>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, Student!</h1>
          <p className="text-muted-foreground">
            Manage your saved properties and share your feedback
          </p>
        </div>

        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 gap-2">
            <TabsTrigger value="saved" className="gap-2">
              <Heart className="h-4 w-4" />
              Saved Properties
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Properties</CardTitle>
                <CardDescription>
                  Properties you've marked as favorites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProperties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>
                {savedProperties.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No saved properties yet. Browse properties and save your favorites!
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>
                  Help us improve EduStay by sharing your thoughts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Share your experience with EduStay..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={6}
                    required
                  />
                  <Button type="submit" className="w-full md:w-auto">
                    Submit Feedback
                  </Button>
                </form>

                <div className="mt-8 space-y-4">
                  <h3 className="font-semibold">Recent Feedback Examples:</h3>
                  <div className="space-y-3">
                    <div className="bg-secondary p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        "Easy to use and helpful in finding verified PGs."
                      </p>
                    </div>
                    <div className="bg-secondary p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        "Would love to see more listings for girls' hostels."
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;
