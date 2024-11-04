import React from "react";
import { Modal } from "src/components/modal/modal";
import { Box, Button, Text } from "src/UI-kit";
import { useCart } from "src/contexts/cart/hooks/use-cart";
import { AnimatePresence } from "framer-motion";
import { Card } from "./card-cart";
import { useRouter } from "src/hooks/useRouter";
import { CHECKOUT_PATH } from "src/routes/routes-config";
import { useTheme } from "styled-components";

export const CartModal = ({ open, setOpen }: any) => {
  const { products, removeFromCart } = useCart();
  const { colors } = useTheme();
  const { push } = useRouter();
  return (
    <Box>
      <Modal
        closeWhenLeave
        top="60px"
        open={open}
        setOpen={setOpen}
        title="YOUR SHOPPING BAG"
        content={
          <Box behavior="column">
            <AnimatePresence>
              {products && products.length ? (
                products.map((el) => {
                  return (
                    <Card
                      key={el.id}
                      id={el.id}
                      image={el.images[0].location}
                      price={el.price}
                      name={el.name}
                      onDelete={removeFromCart}
                    />
                  );
                })
              ) : (
                <Text
                  m="0 0 25px 0"
                  textAlign="center"
                  w="100%"
                  variant="small"
                >
                  Your bag is empty!
                </Text>
              )}
            </AnimatePresence>
            {products.length ? (
              <Button
                m="30px 0 0 0"
                w="fit-content"
                h="fit-content"
                p="8px 14px"
                onClick={() => push(CHECKOUT_PATH)}
              >
                <Text cursor="pointer" color={colors.white} variant="small">
                  CHECKOUT
                </Text>
              </Button>
            ) : null}
          </Box>
        }
      />
    </Box>
  );
};
