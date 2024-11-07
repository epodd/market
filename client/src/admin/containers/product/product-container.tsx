import React from "react";
import styled from "styled-components";
import CreateProductForm from "../../forms/create-product-form";

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  padding: 100px 100px;
  display: flex;
`;

export const ProductContainer = () => {
  return (
    <Wrapper>
      <CreateProductForm />
    </Wrapper>
  );
};
