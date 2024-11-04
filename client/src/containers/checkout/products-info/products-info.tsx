import React from "react";
import { Box, Image, Text } from "src/UI-kit";
import styled from "styled-components";
import { IProduct } from "src/types";

const ProductsBlock = styled(Box)`
  height: 100%;
  width: 500px;
  border-radius: 7px;
  background-color: rgba(154, 154, 154, 0.18);
  padding: 20px 20px;
  box-sizing: border-box;
`;

const ProductItem = styled(Box)`
  margin-bottom: 15px;

  &:last-of-type {
    margin: 0;
  }
`;

const ProductsInfo = ({ products }: { products: IProduct[] }) => {
  return (
    <div>
      <ProductsBlock behavior="column">
        {products.map((el) => (
          <ProductItem key={el.id}>
            <Box>
              <Image
                m="0 20px 0 0"
                w="70px"
                h="70px"
                src={el.images[0].location}
              />
              <Box behavior="column">
                <Text variant="medium">{el.name}</Text>
                <Text variant="small">{el.description}</Text>
                <Text variant="small">{el.price}</Text>
              </Box>
            </Box>
          </ProductItem>
        ))}
      </ProductsBlock>
    </div>
  );
};

export default ProductsInfo;
