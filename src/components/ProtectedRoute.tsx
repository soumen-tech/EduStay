import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"student" | "owner" | "admin" | "sub_owner">;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in -> Redirect to home or login
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // Wait for profile to load
  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check roles
  if (allowedRoles && !allowedRoles.includes(userProfile.userType)) {
    // Role mismatch, determine fallback route based on role
    switch (userProfile.userType) {
      case "owner":
        return <Navigate to="/owner-dashboard" replace />;
      case "sub_owner":
        return <Navigate to="/subowner-dashboard" replace />;
      case "student":
        return <Navigate to="/student/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
