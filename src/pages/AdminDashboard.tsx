import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Building2, LogOut, Users, Home, MessageSquare, TrendingUp, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [feedbackStatus, setFeedbackStatus] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: true,
  });

  const stats = {
    totalStudents: 54,
    totalOwners: 12,
    totalListings: 18,
    totalFeedback: 35,
  };

  const listings = [
    { id: 1, name: "Ghosh Residency PG", owner: "Mr. S. Ghosh", price: 4500, status: "Active" },
    { id: 2, name: "Mitra Boys Hostel", owner: "Mrs. Mitra", price: 4000, status: "Active" },
    { id: 3, name: "Saha Mess & Rooms", owner: "Mr. Saha", price: 5000, status: "Pending" },
  ];

  const feedbacks = [
    { id: 1, student: "Riya", feedback: "Easy to use and helpful in finding verified PGs.", date: "2025-01-15" },
    { id: 2, student: "Ankit", feedback: "Would love to see more listings for girls' hostels.", date: "2025-01-14" },
    { id: 3, student: "Priya", feedback: "The interface is clean and easy to navigate.", date: "2025-01-13" },
  ];

  const owners = [
    { id: 1, name: "Mr. S. Ghosh", email: "ghosh@example.com", properties: 1 },
    { id: 2, name: "Mrs. Mitra", email: "mitra@example.com", properties: 1 },
    { id: 3, name: "Mr. Saha", email: "saha@example.com", properties: 2 },
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleEdit = () => {
    toast.info("Edit functionality - Demo only");
  };

  const handleDelete = () => {
    toast.info("Delete functionality - Demo only");
  };

  const toggleFeedbackReview = (id: number) => {
    setFeedbackStatus({ ...feedbackStatus, [id]: !feedbackStatus[id] });
    toast.success("Feedback status updated");
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EduStay Admin</span>
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
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage listings, users, and feedback
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Owners</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalOwners}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +3 new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalListings}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +5 pending approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalFeedback}</div>
              <p className="text-xs text-muted-foreground mt-1">
                8 unreviewed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Chart Placeholder */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
            <CardDescription>User activity and listing growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-secondary rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Activity chart visualization (Demo)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="owners">Owners</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle>All Listings</CardTitle>
                <CardDescription>Manage property listings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="font-medium">{listing.name}</TableCell>
                        <TableCell>{listing.owner}</TableCell>
                        <TableCell>₹{listing.price.toLocaleString()}/mo</TableCell>
                        <TableCell>
                          <Badge variant={listing.status === "Active" ? "default" : "secondary"}>
                            {listing.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={handleEdit}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleDelete}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Student Feedback</CardTitle>
                <CardDescription>Review and manage student feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reviewed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedbacks.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell className="font-medium">{feedback.student}</TableCell>
                        <TableCell className="max-w-md">{feedback.feedback}</TableCell>
                        <TableCell>{feedback.date}</TableCell>
                        <TableCell>
                          <Switch
                            checked={feedbackStatus[feedback.id]}
                            onCheckedChange={() => toggleFeedbackReview(feedback.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="owners">
            <Card>
              <CardHeader>
                <CardTitle>Property Owners</CardTitle>
                <CardDescription>View and manage owner accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Properties</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {owners.map((owner) => (
                      <TableRow key={owner.id}>
                        <TableCell className="font-medium">{owner.name}</TableCell>
                        <TableCell>{owner.email}</TableCell>
                        <TableCell>{owner.properties}</TableCell>
                        <TableCell>
                          <Badge>Active</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
