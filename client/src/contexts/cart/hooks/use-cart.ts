import { useContext } from "react";
import { CartContext } from "../CartProvider";

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error("CartContext must be placed within CartProvider");
  }

  return context;
};
