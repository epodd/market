import React from "react";
import { useCart } from "src/contexts/cart/hooks/use-cart";
import { Box, Image, Text } from "src/UI-kit";
import styled from "styled-components";
import { Container } from "src/components/container/container";
import CheckoutForm from "./checkout-form/checkout-form";
import ProductsInfo from "./products-info/products-info";

const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
`;

const CheckoutFormWrapper = styled(Box)`
  width: 50%;
  height: 100%;
  padding: 20px 50px;
`;

const CheckoutInfoWrapper = styled(Box)`
  width: 50%;
  height: 100%;
  padding: 20px 50px;
`;

export const CheckoutContainer = () => {
  const { products } = useCart();
  console.log(products);
  return (
    <Container>
      <Wrapper>
        <CheckoutFormWrapper>
          <CheckoutForm />
        </CheckoutFormWrapper>
        <CheckoutInfoWrapper>
          <ProductsInfo products={products} />
        </CheckoutInfoWrapper>
      </Wrapper>
    </Container>
  );
};
