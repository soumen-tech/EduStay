import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import FindAccommodation from "./pages/FindAccommodation";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import StudentProfile from "./pages/StudentProfile";
import StudentDashboard from "./pages/StudentDashboard";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerSignup from "./pages/OwnerSignup";
import OwnerProfile from "./pages/OwnerProfile";
import OwnerDashboard from "./pages/OwnerDashboard";
import ListProperty from "./pages/ListProperty";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import MapView from "./pages/MapView";
import NeighborhoodExplorer from "./pages/NeighborhoodExplorer";
import SavedLocations from "./pages/SavedLocations";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Feedback from "./pages/Feedback";
import Support from "./pages/Support";
import StudentSupport from "./pages/StudentSupport";
import OwnerSupport from "./pages/OwnerSupport";
import FAQ from "./pages/FAQ";
import SavedListings from "./pages/SavedListings";
import PaymentFlow from "./pages/PaymentFlow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/neighborhoods" element={<NeighborhoodExplorer />} />
          <Route path="/saved-locations" element={<SavedLocations />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/find-accommodation" element={<FindAccommodation />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/support" element={<Support />} />
          <Route path="/student-support" element={<StudentSupport />} />
          <Route path="/owner-support" element={<OwnerSupport />} />
          <Route path="/faq" element={<FAQ />} />
        <Route path="/saved-listings" element={<SavedListings />} />
        <Route path="/payment" element={<PaymentFlow />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route path="/owner/signup" element={<OwnerSignup />} />
          <Route path="/owner/profile" element={<OwnerProfile />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/list-property" element={<ListProperty />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
