import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, LogOut, Users, LayoutDashboard, HelpCircle, Activity, PlusCircle, Settings } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { OverviewTab } from "@/components/sub-owner/OverviewTab";
import { PropertiesTab } from "@/components/sub-owner/PropertiesTab";
import { AddPropertyTab } from "@/components/sub-owner/AddPropertyTab";
import { TenantsTab } from "@/components/sub-owner/TenantsTab";

export type TabType = "overview" | "properties" | "add_property" | "tenants";

const SubOwnerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [properties, setProperties] = useState<any[]>([]);
  const [tenants, setTenants] = useState<any[]>([]); // We would fetch this similarly

  useEffect(() => {
    if (!currentUser) return;

    // Fetch properties assigned to sub owner
    const qProps = query(
      collection(db, "properties"),
      where("sub_owner_id", "==", currentUser.uid)
    );

    const unsubProps = onSnapshot(qProps, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(data);
    }, (error) => {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch assigned properties");
    });

    return () => {
      unsubProps();
    };
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (e) {
      toast.error("Failed to logout");
    }
  };

  const NavItem = ({ tab, icon: Icon, label }: { tab: TabType, icon: any, label: string }) => {
    const isActive = activeTab === tab;
    return (
      <button 
        onClick={() => setActiveTab(tab)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-emerald-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
      >
        <Icon className="h-5 w-5" />
        {label}
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col hidden md:flex shrink-0">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-white mb-8">
            <Building2 className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold">Verdant Path PG</span>
          </Link>
          <div className="text-xs uppercase font-semibold text-emerald-500 mb-4 tracking-wider">
            Premium Tier
          </div>
          <nav className="space-y-2">
            <NavItem tab="overview" icon={LayoutDashboard} label="Dashboard" />
            <NavItem tab="properties" icon={Building2} label="My Properties" />
            <NavItem tab="add_property" icon={PlusCircle} label="Add Property" />
            <NavItem tab="tenants" icon={Users} label="Tenants" />
          </nav>
        </div>
        <div className="mt-auto p-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800" disabled>
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800" disabled>
            <HelpCircle className="h-5 w-5 mr-3" />
            Support
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-slate-800 hover:bg-opacity-20" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm shrink-0 sticky top-0 z-10">
          <div className="font-semibold text-slate-800 text-lg md:hidden">
            Verdant Path PG
          </div>
          
          <div className="hidden md:flex ml-auto items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{userProfile?.displayName || "Sub-Owner"}</p>
                <p className="text-xs text-slate-500">{userProfile?.email || "Manager Account"}</p>
              </div>
              <div className="h-10 w-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold relative border-2 border-white shadow-sm overflow-hidden">
                {userProfile?.photoURL ? (
                   <img src={userProfile.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                   userProfile?.displayName?.charAt(0) || "M"
                )}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
          <Button variant="outline" className="md:hidden" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </header>

        <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
           {activeTab === "overview" && <OverviewTab properties={properties} tenants={tenants} />}
           {activeTab === "properties" && <PropertiesTab properties={properties} />}
           {activeTab === "add_property" && <AddPropertyTab />}
           {activeTab === "tenants" && <TenantsTab tenants={tenants} />}
        </div>
      </main>
    </div>
  );
};

export default SubOwnerDashboard;
