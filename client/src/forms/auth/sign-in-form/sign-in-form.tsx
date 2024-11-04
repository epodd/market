import React from "react";
import { InputWithLabel, Text } from "src/UI-kit";
import { Wrapper, AuthFormBlock } from "./styled";
import { Form as FinalForm } from "react-final-form";
import { Button, Box } from "src/UI-kit";
import { validateForm } from "../../validation/validation-helpers";
import { schemaValidation } from "./sign-in-form-validate";
import { useAuth } from "src/contexts";
import { useRouter } from "src/hooks/useRouter";
import { SIGN_UP_PATH } from "../../../routes/routes-config";

export const SignInForm = () => {
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = ({ email, password }: any) => {
    signIn(email, password);
  };

  return (
    <Wrapper>
      <FinalForm
        onSubmit={handleLogin}
        validate={(data) => validateForm(schemaValidation, data)}
        render={({ handleSubmit }) => {
          return (
            <form>
              <AuthFormBlock>
                <Text w="100%" s={14} m="0 0 10px 0" textAlign="center">
                  SIGN IN TO YOUR ACCOUNT
                </Text>
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
                  <Button w="47%" h="20px" type="submit" onClick={handleSubmit}>
                    Sign In
                  </Button>
                  <Text
                    onClick={() => router.push(SIGN_UP_PATH)}
                    w="100%"
                    s={14}
                    textAlign="center"
                    variantHover="underline"
                    cursor="pointer"
                  >
                    Sign Up
                  </Text>
                </Box>
              </AuthFormBlock>
            </form>
          );
        }}
      />
    </Wrapper>
  );
};
