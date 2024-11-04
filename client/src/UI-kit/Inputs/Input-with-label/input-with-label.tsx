import React, { ChangeEvent } from "react";
import { InputWithLabelWrapper, Input, Label } from "./styled";
import { Field } from "react-final-form";
import { Box } from "src/UI-kit";
import {
  showErrorOnBlur,
  showErrorOnChange,
} from "src/forms/validation/validation-helpers";
import { TextError } from "../../Text/Text";

export const InputWithLabel = ({
  label,
  placeholder,
  name,
  type,
  m,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  type?: string;
  name: string;
  m?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Field
      name={name}
      render={(props) => {
        const { meta, input } = props;
        const hasError = showErrorOnChange(props);
        const blured = showErrorOnBlur(props);
        return (
          <Box behavior="column" w="100%">
            <InputWithLabelWrapper m={m}>
              <Input
                type={type}
                placeholder={placeholder}
                error={blured && hasError && meta.error}
                {...input}
              />
              {input.value && <Label>{label}</Label>}
            </InputWithLabelWrapper>
            {blured && hasError && meta.error && (
              <Box m="0 0 10px 0">
                <TextError>{meta.error}</TextError>
              </Box>
            )}
          </Box>
        );
      }}
    />
  );
};
