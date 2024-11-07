import React from "react";
import styled from "styled-components";
import { Box, Button, InputWithLabel, Text } from "src/UI-kit";
import { Form } from "react-final-form";
import {
  useAddColor,
  useDeleteColor,
  useGetColors,
} from "src/api/color/useRequests";
import _ from "lodash";
import useSnackbars from "src/hooks/useSnackbar";
import { AnimationBox, AnimationPresenceBox, Icon } from "../../../components";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { IColor } from "src/types";
import { GET_COLORS } from "src/api/color/schema";
import { useApolloClient } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.div`
  padding: 100px 100px;
`;

const ColorItem = styled.div<{ color?: string }>`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: ${({ color }) => color || "transparent"};
  margin-right: 15px;
  margin-left: 15px;
`;

const transformHexValueToHex = (hex: string) => {
  const firstSymbol = hex?.charAt(0);

  if (firstSymbol === "#") {
    return hex;
  } else {
    return `#${hex}`;
  }
};

export const ColorContainer = () => {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbars();
  const { data } = useGetColors();
  const [addColor] = useAddColor();
  const [deleteColor] = useDeleteColor();

  const client = useApolloClient();

  const handleAddColor = (data: { name: string; color: string }) => {
    return addColor({
      variables: {
        data: {
          name: data.name,
          color: transformHexValueToHex(data.color),
        },
      },
      onCompleted: () => {
        showSuccessSnackbar(`Color '${data.name}' successfully added!`);
      },
      onError: (error) => {
        showErrorSnackbar("Something went wrong!" + error);
      },
      update(cache, { data }) {
        const { getColors }: any = client.readQuery({
          query: GET_COLORS,
        });

        const cloneCache = _.cloneDeep(getColors);
        cloneCache.push(data.addColor);

        client.writeQuery({
          query: GET_COLORS,
          data: { getColors: cloneCache },
        });
      },
    });
  };

  const handleDeleteColor = (colorId: string, name: string) => {
    deleteColor({
      variables: {
        colorId,
      },
      onCompleted: () => {
        showSuccessSnackbar(`Color '${name}' successfully deleted!`);
      },
      onError: (error) => {
        showErrorSnackbar("Something went wrong!" + error);
      },
      update: (cache, { data }) => {
        if (!data || !data?.deleteColor) return;
        const { getColors }: any = cache.readQuery({
          query: GET_COLORS,
        });

        const updateColors = getColors.filter(
          (el: IColor) => el.id !== data.deleteColor.id
        );

        cache.writeQuery({
          query: GET_COLORS,
          data: { getColors: updateColors },
        });
      },
    });
  };

  return (
    <Wrapper>
      <Box behavior="column">
        <Text m="0 0 80px 0" variant="medium">
          Colors creator
        </Text>
        <Form
          onSubmit={handleAddColor}
          render={({ handleSubmit, values, form: { reset } }) => {
            return (
              <Box behavior="column">
                <InputWithLabel
                  placeholder="Enter color name"
                  label="Color name"
                  name="name"
                />
                <Box m="15px 0 15px 0" behavior="column">
                  <InputWithLabel
                    placeholder="Enter color #hex"
                    label="Color hex"
                    name="color"
                  />
                  <a
                    href="https://htmlcolorcodes.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Text
                      m="10px 0 0 0"
                      variant="small"
                      cursor="pointer"
                      variantHover="underline"
                    >
                      Help choosing a color
                    </Text>
                  </a>
                </Box>
                <Button
                  w="fit-content"
                  h="fit-content"
                  p="7px 10px"
                  color={values?.color}
                  onClick={() => {
                    handleSubmit()?.then((res) => {
                      reset();
                    });
                  }}
                >
                  ADD NEW COLOR
                </Button>
              </Box>
            );
          }}
        />
        <Text m="60px 0 20px 0" variant="medium">
          All available colors:
        </Text>
        <Box behavior="column">
          <AnimatePresence>
            {data &&
              data.getColors?.map((el) => {
                return (
                  <motion.div
                    key={el.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Box m="0 0 15px 0" behavior="rowAlignCenter">
                      <Icon
                        onClick={() => handleDeleteColor(el.id, el.name)}
                        cursor="pointer"
                        icon={faTrash}
                      />
                      <ColorItem color={el?.color} />
                      <Text
                        m="0 15px 0 0"
                        variant="small"
                      >{`${el?.name} (hex: ${el?.color})`}</Text>
                    </Box>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </Box>
      </Box>
    </Wrapper>
  );
};
