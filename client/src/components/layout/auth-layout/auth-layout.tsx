import React, { ReactNode } from "react";
import { AnimationBox } from "@components";
import styled from "styled-components";
import { Box } from "src/UI-kit";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <Box h="100%" w="100%">
        <AnimationBox variantAnimation="pageAnimation">{children}</AnimationBox>
      </Box>
    </Wrapper>
  );
};
