import styled, { css } from "styled-components";
import { CSSProperties } from "react";
import { setProp } from "../utils";
import { FontsType, theme } from "../theme";

const TextNames = {
  regular: "ibm_plex_monoregular",
  bold: "ibm_plex_monomedium",
};

const TextHovers = {
  underline: css`
    text-decoration: underline;
  `,
};

export const Text = styled.p<{
  s?: number;
  font?: keyof typeof TextNames;
  w?: CSSProperties["width"];
  m?: CSSProperties["margin"];
  variant?: keyof typeof FontsType;
  variantHover?: keyof typeof TextHovers;
  textAlign?: CSSProperties["textAlign"];
  ls?: CSSProperties["letterSpacing"];
  cursor?: CSSProperties["cursor"];
  color?: CSSProperties["color"];
}>`
  font-family: ${({ font }) => (font ? TextNames[font] : TextNames["regular"])};
  font-size: ${({ s }) => (s ? s + "px" : "14px")};
  text-align: ${setProp("start", "textAlign")};
  width: ${setProp("auto", "w")};
  margin: ${setProp("0", "m")};
  cursor: ${setProp("auto", "cursor")};
  color: ${setProp("canvastext", "color")};
  letter-spacing: ${setProp("normal", "ls")};

  ${({ theme, font = "regular", variant }) =>
    variant && theme.fonts[font]?.[variant]}

  &:hover {
    ${({ variantHover }) => variantHover && TextHovers[variantHover]}
  }
`;

export const TextError = styled(Text)`
  background-color: ${({ theme }) => theme.colors.red};
`;
