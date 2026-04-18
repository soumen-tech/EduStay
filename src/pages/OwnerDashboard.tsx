import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, LogOut, Plus, Users, LayoutDashboard, HelpCircle, Activity } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Custom Node for React Flow
const ProfileNode = ({ data }: any) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-primary w-48 text-center">
      <Handle type="target" position={Position.Top} className="w-16 !bg-primary" />
      <div className="font-bold text-sm">{data.label}</div>
      <div className="text-xs text-muted-foreground">{data.role}</div>
      {data.stats && <div className="text-xs text-accent mt-1 font-medium">{data.stats}</div>}
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-primary" />
    </div>
  );
};

const nodeTypes = {
  profileNode: ProfileNode,
};

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();
  
  const [subOwners, setSubOwners] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSubOwnerEmail, setNewSubOwnerEmail] = useState("");
  const [newSubOwnerName, setNewSubOwnerName] = useState("");

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Fetch Sub-owners
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "sub_owners"),
      where("owner_id", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubOwners(data);
    }, (error) => {
      console.error("Error fetching sub-owners:", error);
      toast.error("Failed to fetch sub-owners");
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Generate Graph Data
  useEffect(() => {
    if (!userProfile) return;

    const initialNodes = [
      {
        id: "owner-root",
        type: "profileNode",
        position: { x: 300, y: 50 },
        data: { 
          label: userProfile.displayName || "Owner", 
          role: "Chief Executive",
          stats: `${subOwners.length} Sub-owners`
        },
      }
    ];

    const initialEdges: any[] = [];

    subOwners.forEach((sub, index) => {
      const nodeId = `sub-${sub.id}`;
      // Distribute nodes horizontally
      const xOffset = 100 + (index * 200);
      initialNodes.push({
        id: nodeId,
        type: "profileNode",
        position: { x: xOffset, y: 200 },
        data: {
          label: sub.sub_owner_name,
          role: "Sub-Owner",
          stats: sub.assigned_properties?.length ? `${sub.assigned_properties.length} Properties` : "0 Properties"
        }
      });

      initialEdges.push({
        id: `e-owner-${sub.id}`,
        source: "owner-root",
        target: nodeId,
        animated: true,
        style: { stroke: "#2E8B57", strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#2E8B57",
        },
      });
    });

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [subOwners, userProfile, setNodes, setEdges]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleAddSubOwner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    try {
      await addDoc(collection(db, "sub_owners"), {
        owner_id: currentUser.uid,
        sub_owner_name: newSubOwnerName,
        sub_owner_email: newSubOwnerEmail,
        assigned_properties: [],
        createdAt: serverTimestamp()
      });
      toast.success("Sub-owner added successfully!");
      setIsAddModalOpen(false);
      setNewSubOwnerEmail("");
      setNewSubOwnerName("");
    } catch (error) {
      console.error("Error adding sub-owner:", error);
      toast.error("Failed to add sub-owner");
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 text-white mb-8">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Verdant Path PG</span>
          </Link>
          <div className="text-xs uppercase font-semibold text-slate-500 mb-4 tracking-wider">
            Management
          </div>
          <nav className="space-y-2">
            <Link to="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-slate-800 text-white">
              <LayoutDashboard className="h-5 w-5" />
              Graph View
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
      <main className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center z-10 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Owner Dashboard</h1>
            <p className="text-sm text-slate-500">Visual management portal</p>
          </div>
          <div className="flex gap-4">
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sub-Owner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Sub-Owner</DialogTitle>
                  <DialogDescription>
                    Create a management record for a new sub-owner. They will be linked to your properties.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddSubOwner} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g. Elena Vance" 
                      value={newSubOwnerName}
                      onChange={e => setNewSubOwnerName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="elena@example.com" 
                      value={newSubOwnerEmail}
                      onChange={e => setNewSubOwnerEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full">Create Record</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="md:hidden" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Graph Area */}
        <div className="flex-1 w-full h-full bg-slate-50 relative">
          {nodes.length > 0 ? (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              attributionPosition="bottom-right"
              className="bg-slate-50"
            >
              <Background color="#ccc" gap={16} />
              <Controls />
            </ReactFlow>
          ) : (
            <div className="flex bg-slate-50 items-center justify-center h-full">
              <div className="text-center text-slate-500">
                <p>Loading graph data...</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
