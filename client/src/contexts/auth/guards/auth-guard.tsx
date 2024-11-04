import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useRouter } from "../../../hooks/useRouter";
import { AnimationBox } from "../../../components";
import { getSession, isValidToken, setSession } from "../jwt-utils";
import { AuthActions } from "../types";

interface AuthGuardType {
  children: React.ReactNode;
  signInPath: string;
}

export function AuthGuard({ children, signInPath }: AuthGuardType) {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  if (isInitialized && !isAuthenticated) {
    return <Navigate to={signInPath} state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

export default AuthGuard;
