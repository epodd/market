import { useContext } from "react";
import { SessionContext } from "../AuthProvider";

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context)
    throw new Error("useSession must be placed within AuthProvider");

  return context;
};

export default useSession;
