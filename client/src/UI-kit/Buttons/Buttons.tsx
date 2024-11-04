import styled from "styled-components";
import { setProp } from "../utils";
import { CSSProperties } from "react";

export const Button = styled.button<{
  w?: CSSProperties["width"];
  m?: CSSProperties["margin"];
  h?: CSSProperties["height"];
  p?: CSSProperties["padding"];
}>`
  background-color: ${({ color, theme }) => color || theme.colors.black};
  border: none;
  width: ${setProp("100px", "w")};
  height: ${setProp("20px", "h")};
  padding: ${setProp("0", "p")};
  margin: ${setProp("0", "m")};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s background-color;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brown};
  }
`;
