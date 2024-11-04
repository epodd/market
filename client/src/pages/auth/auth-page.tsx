import React from "react";
import { SignInForm, SignUpForm } from "src/forms";
import { useRouter } from "../../hooks/useRouter";

export const AuthPage = () => {
  const { pathname } = useRouter();

  return (
    <>
      {
        {
          "/auth/signIn": <SignInForm />,
          "/auth/signUp": <SignUpForm />,
        }[pathname]
      }
    </>
  );
};
