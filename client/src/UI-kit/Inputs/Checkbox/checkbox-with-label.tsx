import React, { ChangeEvent } from "react";
import { Checkbox, HiddenCheckbox } from "./styled";
import { Field } from "react-final-form";
import { Box, Text } from "src/UI-kit";
import styled from "styled-components";

const Label = styled(Box)``;

export const CheckboxWithLabel = ({
  label,
  name,
  value,
  type = "checkbox",
  m,
  id,
}: {
  label: string;
  id?: string;
  value?: string;
  type?: string;
  name: string;
  m?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Field
      name={name}
      id={id}
      type={type}
      value={value}
      render={(props) => {
        return (
          <Label m={m}>
            <Box behavior="rowAlignCenter">
              <CheckboxComponent {...props.input} />
              <Text cursor="pointer" m="10px 0 10px 15px" variant="small">
                {label}
              </Text>
            </Box>
          </Label>
        );
      }}
    />
  );
};

export const CheckboxComponent = (props: any) => {
  return (
    <label>
      <HiddenCheckbox {...props} />
      <Checkbox value={props.checked} />
    </label>
  );
};
