import React from "react";
import styled from "styled-components";
import CreateProductForm from "../../forms/create-product-form";

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
`;

export const ProductContainer = () => {
  return (
    <Wrapper>
      <CreateProductForm />
    </Wrapper>
  );
};
