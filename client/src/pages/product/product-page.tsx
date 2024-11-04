import React from "react";
import { useParams } from "react-router-dom";
import { ProductContainer } from "src/containers/product/product-container";

export const ProductPage = () => {
  const { idProduct } = useParams();

  return <ProductContainer idProduct={idProduct} />;
};
