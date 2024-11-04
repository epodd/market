import React from "react";
import { ProductsContainer } from "src/containers/products/products-container";
import { Container } from "src/components/container/container";

export const MainPage = () => {
  return (
    <Container>
      <ProductsContainer />
    </Container>
  );
};
