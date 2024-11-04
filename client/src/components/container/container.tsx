import React, { ReactNode } from "react";
import styled from "styled-components";

const ContainerBlock = styled.div`
  padding: 0 20px;
  margin: 0 auto;
`;

export const Container = ({ children }: { children: ReactNode }) => {
  return <ContainerBlock>{children}</ContainerBlock>;
};
