import React from "react";
import { InputWithLabel, Text } from "src/UI-kit";
import { Wrapper, AuthFormBlock } from "./styled";
import { Form as FinalForm } from "react-final-form";
import { Button, Box } from "src/UI-kit";
import { validateForm } from "../../validation/validation-helpers";
import { schemaValidation } from "./sign-up-form-validate";
import { useAuth } from "src/contexts";
import { useRouter } from "src/hooks/useRouter";
import { SIGN_IN_PATH } from "src/routes/routes-config";
import { RegistrationMutationVariables } from "src/api";

export const SignUpForm = () => {
  const { signUp } = useAuth();
  const router = useRouter();

  const handleLogin = (data: RegistrationMutationVariables) => {
    signUp(data);
  };

  return (
    <Wrapper>
      <FinalForm
        onSubmit={handleLogin}
        validate={(data) => validateForm(schemaValidation, data)}
        render={({ handleSubmit }) => {
          return (
            <AuthFormBlock>
              <Text w="100%" s={14} m="0 0 10px 0" textAlign="center">
                SIGN UP
              </Text>
              <InputWithLabel
                m="0 0 10px"
                placeholder="Name"
                name="name"
                label="Name"
              />
              <InputWithLabel
                m="0 0 10px"
                placeholder="Email"
                name="email"
                label="Email"
              />
              <InputWithLabel
                placeholder="Password"
                type="password"
                name="password"
                label="Password"
                m="0 0 10px"
              />
              <Box w="100%" behavior="rowAlignCenterEnd">
                <Button w="47%" h="20px" onClick={handleSubmit}>
                  Sign Up
                </Button>
                <Text
                  onClick={() => router.push(SIGN_IN_PATH)}
                  w="100%"
                  s={14}
                  textAlign="center"
                  variantHover="underline"
                  cursor="pointer"
                >
                  Sign In
                </Text>
              </Box>
            </AuthFormBlock>
          );
        }}
      />
    </Wrapper>
  );
};
