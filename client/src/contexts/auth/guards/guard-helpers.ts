import { AuthUser, RoleTypes } from "../types";
import { useAuth } from "../hooks/use-auth";
import { Navigate } from "react-router-dom";

export const isAdmin = (user: AuthUser) => {
  return user?.role === RoleTypes.admin;
};
