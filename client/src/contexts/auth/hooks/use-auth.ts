import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("AuthContext must be placed within AuthProvider");
  }

  return context;
};
