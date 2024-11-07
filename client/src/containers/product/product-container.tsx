import React, { useMemo, useRef, useState } from "react";
import { Text, Box, Button } from "src/UI-kit";
import { Link } from "react-router-dom";
import { AnimationBox, Icon } from "src/components";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  Wrapper,
  ImageBlock,
  BlockSizer,
  ColorItem,
  InfoBlock,
  SizeItem,
  Image,
} from "./styled";
import { useCart } from "src/contexts/cart/hooks/use-cart";
import { useGetProductByIdsHook } from "../../hooks/product-hooks/useGetProductsById";

interface ProductContainerProps {
  idProduct: string | undefined;
}

export const ProductContainer = ({ idProduct }: ProductContainerProps) => {
  const [fullSize, setFullSize] = useState<boolean>(false);
  const { addToCart, products, removeFromCart } = useCart();
  const productsId = products.map((el) => el.id);
  const imagesBlockRef = useRef<HTMLDivElement>(null);
  const { products: productsById } = useGetProductByIdsHook(
    useMemo(() => [String(idProduct)], [idProduct])
  );

  const [size, setSize] = useState("");
  const product = productsById?.[0];
  const alreadyInCart = product && productsId.includes(product.id);

  const handleChangeProductParams = (value: any) => {
    setSize(size === value ? null : value);
  };

  return (
    <Wrapper behavior="row">
      <ImageBlock>
        <AnimationBox
          controlOn
          variantAnimation="sizingImage"
          initial={fullSize ? "visible" : "hidden"}
        >
          <BlockSizer>
            <Box behavior="column" ref={imagesBlockRef}>
              {product?.images.map((el, i) => {
                return (
                  <Image
                    onClick={() => setFullSize(!fullSize)}
                    key={el.key}
                    src={el.location}
                  />
                );
              })}
            </Box>
          </BlockSizer>
        </AnimationBox>
      </ImageBlock>
      <InfoBlock>
        <Box behavior="column" position="fixed">
          <Text variant="huge">{product?.name}</Text>
          <Text variant="medium">{product?.price}$</Text>
          <Text m="15px 0 0 0" variant="small">
            {product?.description}
          </Text>
          <Box m="40px 0 0 0" behavior="column">
            <Text variant="small">COLORS:</Text>
            {product?.variantsColor.length ? (
              <Box>
                {product?.variantsColor.map(({ color, id }) => {
                  return (
                    <Link key={id} to={`/product/${id}`}>
                      <ColorItem active={id === idProduct} color={color} />
                    </Link>
                  );
                })}
              </Box>
            ) : (
              <ColorItem color={product?.color} />
            )}
          </Box>
          {product?.sizes.length ? (
            <Box m="40px 0 0 0" behavior="column">
              <Text variant="small">SIZES:</Text>
              <Box>
                {product?.sizes.map((el) => {
                  return (
                    <SizeItem
                      active={el === size}
                      key={el}
                      onClick={() => handleChangeProductParams(el)}
                    >
                      <Text cursor="pointer" variant="small">
                        {el}
                      </Text>
                    </SizeItem>
                  );
                })}
              </Box>
            </Box>
          ) : null}
          <Box m="25px 0 0 0" behavior="rowAlignCenter">
            <Button
              m="0 15px 0 0"
              w="fit-content"
              h="fit-content"
              p="10px 40px"
              onClick={() =>
                alreadyInCart
                  ? removeFromCart(product.id)
                  : product && addToCart({ ...product, sizes: [size] })
              }
            >
              {alreadyInCart ? "REMOVE FROM BAG" : "ADD TO BAG"}
            </Button>
            <Button w="fit-content" h="fit-content" p="10px">
              <Icon icon={faHeart} />
            </Button>
          </Box>
        </Box>
      </InfoBlock>
    </Wrapper>
  );
};
