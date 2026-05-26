import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-light-muted dark:text-dark-muted text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const dashboardPaths: Record<UserRole, string> = {
      owner: "/dashboard/owner", vet: "/dashboard/vet", groomer: "/dashboard/groomer",
      trainer: "/dashboard/trainer", vendor: "/dashboard/vendor", shelter: "/dashboard/shelter",
      admin: "/dashboard/admin",
    };
    return <Navigate to={dashboardPaths[user.role]} replace />;
  }

  return <>{children}</>;
}
