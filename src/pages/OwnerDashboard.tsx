import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, LogOut, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      image: room1,
      name: "Ghosh Residency PG",
      price: 4500,
      type: "PG",
      status: "Active"
    },
    {
      id: 2,
      image: room2,
      name: "Student Paradise",
      price: 4200,
      type: "Room",
      status: "Active"
    }
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleEdit = (id: number) => {
    toast.info("Edit functionality - Demo only");
  };

  const handleDelete = (id: number) => {
    toast.info("Delete functionality - Demo only");
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
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Property Owner Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your property listings
            </p>
          </div>
          <Link to="/owner/list-property">
            <Button className="bg-accent hover:bg-accent/90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardDescription>Total Properties</CardDescription>
              <CardTitle className="text-3xl">{properties.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Active Listings</CardDescription>
              <CardTitle className="text-3xl">{properties.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Views</CardDescription>
              <CardTitle className="text-3xl">156</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Properties List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Properties</CardTitle>
            <CardDescription>
              Manage and edit your property listings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {properties.map((property) => (
              <div key={property.id} className="flex flex-col md:flex-row gap-4 p-4 bg-secondary rounded-lg">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full md:w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{property.name}</h3>
                      <p className="text-sm text-muted-foreground">{property.type}</p>
                    </div>
                    <Badge variant="secondary">{property.status}</Badge>
                  </div>
                  <p className="text-xl font-bold text-primary mb-4">
                    ₹{property.price.toLocaleString()}/month
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(property.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(property.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default OwnerDashboard;
