import styled from "styled-components";
import { Box, Image, Text } from "src/UI-kit";
import { AnimationBox, Icon } from "src/components";
import { Link } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const CartItem = styled(Box)`
  cursor: pointer;
  transition: 0.3s transform;

  &:hover {
    transform: scale(1.01);
  }
`;

export const Card = ({ id, image, name, price, onDelete }: any) => {
  return (
    <AnimationBox key={id} variantAnimation="deleteProductFromCart">
      <CartItem w="100%" position="relative" m="0 0 15px 0" key={id}>
        <Link style={{ width: "100%" }} to={`product/${id}`}>
          <Box behavior="rowAlignCenter">
            <Box>
              <Image of="cover" w="60px" h="60px" src={image} />
            </Box>
            <Box m="0 0 0 15px" behavior="column">
              <Text variant="small">{name}</Text>
              <Text variant="small">{price}</Text>
            </Box>
          </Box>
        </Link>
        <Box position="absolute" r="0" t="0" onClick={() => onDelete(id)}>
          <Icon cursor="pointer" icon={faXmark} />
        </Box>
      </CartItem>
    </AnimationBox>
  );
};
