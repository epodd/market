import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

interface AuthGuardType {
  children: React.ReactNode;
  signInPath: string;
}

export function AuthAdminGuard({ children, signInPath }: AuthGuardType) {
  const { isAuthenticated, isInitialized, user } = useAuth();
  const location = useLocation();

  if (isInitialized && isAuthenticated && user?.role !== "admin") {
    return <Navigate to={signInPath} state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

export default AuthAdminGuard;
