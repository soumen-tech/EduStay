import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface TenantsTabProps {
  tenants: any[];
}

export const TenantsTab = ({ tenants }: TenantsTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);

  // Mock tenants if none exist for demonstration matching the design
  const displayTenants = tenants.length > 0 ? tenants : [
    { id: '1', name: 'Arjun Reddy', phone: '+91 98765 43210', status: 'Occupied', category: 'Student', room: '102-A', payment: 'PAID' },
    { id: '2', name: 'Priya Patil', phone: '+91 87654 32109', status: 'Occupied', category: 'Office Worker', room: '305-B', payment: 'PENDING' },
    { id: '3', name: 'Siddharth Jain', phone: '+91 76543 21098', status: 'Notice Period', category: 'Student', room: '204-A', payment: 'PAID' },
  ];

  const filteredTenants = displayTenants.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Tenant added successfully!");
    setIsAddTenantOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Tenant Registry</h2>
          <p className="text-sm text-slate-500">Manage your active and past tenants</p>
        </div>
        
        <Dialog open={isAddTenantOpen} onOpenChange={setIsAddTenantOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
              <DialogDescription>
                Enter the details of the new tenant to register them in the system.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddTenant} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="tenantName">Full Name</Label>
                <Input id="tenantName" placeholder="e.g. John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenantPhone">Phone Number</Label>
                <Input id="tenantPhone" placeholder="+91 xxxxx xxxxx" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertySelect">Assign Property</Label>
                  <Select required>
                    <SelectTrigger id="propertySelect">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prop1">Emerald PG</SelectItem>
                      <SelectItem value="prop2">Boys Hostel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomNumber">Room Number</Label>
                  <Input id="roomNumber" placeholder="e.g. 101" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="moveInDate">Move-in Date</Label>
                <Input id="moveInDate" type="date" required />
              </div>
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddTenantOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">Add Tenant</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4 items-center bg-slate-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search tenants by name or room..." 
              className="pl-9 bg-white border-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="text-slate-600">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-emerald-50/50">
              <TableRow>
                <TableHead className="w-[250px] text-emerald-900 font-semibold">TENANT NAME</TableHead>
                <TableHead className="text-emerald-900 font-semibold">STATUS</TableHead>
                <TableHead className="text-emerald-900 font-semibold">CATEGORY</TableHead>
                <TableHead className="text-emerald-900 font-semibold">ROOM</TableHead>
                <TableHead className="text-emerald-900 font-semibold">PAYMENT</TableHead>
                <TableHead className="text-right text-emerald-900 font-semibold">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No tenants found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-medium">
                      <div className="flexItems-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {tenant.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-slate-900">{tenant.name}</p>
                          <p className="text-xs text-slate-500">{tenant.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-normal ${
                        tenant.status === 'Occupied' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        tenant.status === 'Notice Period' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 inline-block ${
                          tenant.status === 'Occupied' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}></div>
                        {tenant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 flex items-center gap-2">
                       {tenant.category}
                    </TableCell>
                    <TableCell className="font-medium text-slate-700">{tenant.room}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-bold ${tenant.payment === 'PAID' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {tenant.payment === 'PAID' ? '✓ PAID' : '! PENDING'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Tenant</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove Tenant</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500 bg-slate-50 flex-wrap gap-4">
          <div>Showing {filteredTenants.length} of {displayTenants.length} tenants</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Prev</Button>
            <Button variant="default" className="bg-slate-800 text-white" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
