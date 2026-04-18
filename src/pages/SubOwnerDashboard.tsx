import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, LogOut, Users, LayoutDashboard, HelpCircle, Activity } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SubOwnerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();
  
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    // We assume properties collection has a sub_owner_id field
    const q = query(
      collection(db, "properties"),
      where("sub_owner_id", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(data);
    }, (error) => {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch assigned properties");
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-white mb-8">
            <Building2 className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold">Verdant Path PG</span>
          </Link>
          <div className="text-xs uppercase font-semibold text-emerald-500 mb-4 tracking-wider">
            Premium Tier
          </div>
          <nav className="space-y-2">
            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-800 text-white">
              <LayoutDashboard className="h-5 w-5" />
              Overview
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
              <Activity className="h-5 w-5" />
              Analytics
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
              <Building2 className="h-5 w-5" />
              Property Hub
            </Link>
            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
              <Users className="h-5 w-5" />
              Tenant Registry
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
            <HelpCircle className="h-5 w-5 mr-3" />
            Support
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sub-Owner Management Portal</h1>
            <p className="text-sm text-slate-500">{userProfile?.email || "Manager"} • Assigned units only</p>
          </div>
          <Button variant="outline" className="md:hidden" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </header>

        <div className="p-8 space-y-8 max-w-6xl mx-auto w-full">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-emerald-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Managed Properties</CardDescription>
                <CardTitle className="text-3xl text-slate-800">{properties.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-emerald-600 font-medium">+1 this month</div>
              </CardContent>
            </Card>
            <Card className="border-emerald-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Total Tenants</CardDescription>
                <CardTitle className="text-3xl text-slate-800">24</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-500">Across all units</div>
              </CardContent>
            </Card>
            <Card className="border-emerald-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Available Rooms</CardDescription>
                <CardTitle className="text-3xl text-slate-800">02</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-amber-600 font-medium">Needs attention</div>
              </CardContent>
            </Card>
          </div>

          {/* Assigned Properties */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">Assigned Units</h2>
            {properties.length === 0 ? (
              <div className="bg-white rounded-lg border p-8 text-center">
                <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No properties assigned</h3>
                <p className="text-slate-500 max-w-md mx-auto mt-2">
                  You currently don't have any properties assigned to your account. 
                  Contact the Chief Executive to have units assigned.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map(property => (
                  <Card key={property.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{property.name}</CardTitle>
                      <CardDescription>{property.location || "Location not specified"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-slate-500">Monthly Rent</div>
                        <div className="font-bold text-lg text-emerald-600">₹{property.price?.toLocaleString()}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-500">Status</div>
                        <div className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                          {property.status || "Active"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubOwnerDashboard;
