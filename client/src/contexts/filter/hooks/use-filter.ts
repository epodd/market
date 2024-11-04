import { useContext } from "react";
import { FilterContext } from "../FilterProvider";

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw Error("FilterProvider must be placed within FilterProvider");
  }

  return context;
};
