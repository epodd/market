import styled from "styled-components";
import { setProp } from "../../utils";
import { CSSProperties } from "react";

export const Input = styled.input<{
  error?: boolean;
  h?: CSSProperties["height"];
  w?: CSSProperties["width"];
  m?: CSSProperties["margin"];
  p?: CSSProperties["padding"];
}>`
  height: ${setProp("20px", "h")};
  width: ${setProp("100%", "w")};
  margin: ${setProp("0", "m")};
  padding: ${setProp("23px 14px", "p")};
  outline: none;
  font-family: ibm_plex_monoregular, sans-serif, -apple-system;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.gray_light};
  border-radius: 7px;
  border: ${({ error, theme }) =>
    error ? `1px solid ${theme.colors.red}` : "none"};
  position: relative;
  box-sizing: border-box;
`;

export const InputWithLabelWrapper = styled.div<{ m?: string }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;
  margin: ${setProp("0", "m")};
`;

export const Label = styled.label`
  font-family: ibm_plex_monoregular, sans-serif, -apple-system;
  font-size: 10px;
  padding-left: 15px;
  position: absolute;
  color: rgba(0, 0, 0, 0.65);
  top: 0;
  height: 15px;
  display: flex;
  align-items: center;
`;
