import { useContext } from "react";
import { StoreContext } from "../StoreProvider";

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw Error("StoreProvider must be placed within StoreProvider");
  }

  return context;
};
