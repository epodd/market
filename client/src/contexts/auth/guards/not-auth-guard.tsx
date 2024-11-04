import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import get from "lodash/get";
import { useAuth } from "../hooks/use-auth";

interface AuthGuardType {
  children: React.ReactNode;
  defaultAuthorizedPath: string;
}

export function NonAuthGuard({
  children,
  defaultAuthorizedPath,
}: AuthGuardType) {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  if (isInitialized && isAuthenticated) {
    const to = get(location, "state.from", defaultAuthorizedPath);
    return <Navigate to={to} replace />;
  }

  return <>{children}</>;
}

export default NonAuthGuard;
