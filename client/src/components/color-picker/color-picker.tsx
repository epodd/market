import React from "react";
import styled from "styled-components";
import { Box, Text } from "src/UI-kit";
import { useFormState } from "react-final-form";

export const ColorItem = styled(Box)<{
  color?: string;
  active?: boolean;
  value?: string;
}>`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color || "black"};
  border-radius: 4px;
  cursor: pointer;
  border: ${({ theme }) => `1px solid ${theme.colors.gray_light}`};
  filter: ${({ active, value }) =>
    value ? (active ? "grayscale(0%)" : "grayscale(100%)") : "grayscale(0%)"};
  transform: ${({ active }) => (active ? "scale(1.2)" : "scale(1)")};
  transition: 0.3s;
`;

const ColorItemWrapper = styled(Box)`
  padding: 4px 6px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.gray_light};
  cursor: pointer;
  margin-right: 5px;
  margin-top: 5px;
`;

export const ColorPicker = ({
  name,
  items,
  onChange,
}: {
  name: string;
  items?: { color: string; name: string; id: string }[];
  onChange: any;
}) => {
  const { values } = useFormState();

  return (
    <Box behavior="column">
      <Text m="0 0 15px 0" variant="small">
        Select color
      </Text>
      <Box w="250px" fw="wrap" m="0 0 20px 0" behavior="rowAlignCenter">
        {items?.map((el) => {
          return (
            <ColorItemWrapper
              key={el.id}
              behavior="rowAlignCenter"
              onClick={() =>
                onChange(name, values[name] === el.color ? null : el.color)
              }
            >
              <ColorItem
                key={el.id}
                active={values[name] === el.color}
                value={values[name]}
                color={el.color}
              />
              <Text m="0 0 0 10px" cursor="pointer" variant="small">
                {el.name}
              </Text>
            </ColorItemWrapper>
          );
        })}
      </Box>
    </Box>
  );
};
