import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, DoorOpen, BadgeCheck } from "lucide-react";

interface OverviewTabProps {
  properties: any[];
  tenants: any[];
}

export const OverviewTab = ({ properties, tenants }: OverviewTabProps) => {
  const totalProperties = properties.length;
  // Calculate total rooms - for demo assume each property has a field or we just mock a number for now, 
  // or count from tenants if we have room numbers? The user said "Total Rooms, Occupied Rooms, Available Rooms".
  // Let's assume property object has a "total_rooms" or just display a placeholder if not present.
  const totalRooms = properties.reduce((acc, curr) => acc + (parseInt(curr.total_rooms) || 0), 0);
  const occupiedRooms = tenants.filter(t => t.status === "Active" || t.status === "Occupied").length;
  const availableRooms = Math.max(0, totalRooms - occupiedRooms);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Building2 className="w-16 h-16 text-emerald-600" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-slate-500">Total Properties</CardDescription>
            <CardTitle className="text-4xl text-slate-800">{totalProperties}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-400 mt-1">Under your management</div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DoorOpen className="w-16 h-16 text-emerald-600" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-slate-500">Total Rooms</CardDescription>
            <CardTitle className="text-4xl text-slate-800">{totalRooms || "-"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-400 mt-1">Across all properties</div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="w-16 h-16 text-emerald-600" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-slate-500">Occupied Rooms</CardDescription>
            <CardTitle className="text-4xl text-slate-800">{occupiedRooms}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-emerald-600 font-medium mt-1">Currently active</div>
          </CardContent>
        </Card>

        <Card className="border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BadgeCheck className="w-16 h-16 text-amber-500" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-slate-500">Available Rooms</CardDescription>
            <CardTitle className="text-4xl text-slate-800">{totalRooms ? availableRooms : "-"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-amber-600 font-medium mt-1">Ready for occupancy</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="col-span-1 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest updates from your properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-slate-500 italic">No recent activity.</div>
          </CardContent>
        </Card>

        <Card className="col-span-1 shadow-sm border-slate-200 bg-emerald-900 text-white">
          <CardHeader>
             <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-emerald-50">
             <p className="text-sm">Manage your properties and tenants quickly.</p>
             {/* Quick action buttons can be handled by parent tab switcher or context if needed, leaving static for overview */}
             <div className="flex gap-4">
                <div className="px-4 py-2 bg-emerald-800 rounded-md cursor-pointer hover:bg-emerald-700 transition">Add Property</div>
                <div className="px-4 py-2 bg-emerald-800 rounded-md cursor-pointer hover:bg-emerald-700 transition">View Tenants</div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
