import { css, CSSProp, DefaultTheme } from "styled-components";

export enum FontsType {
  small = "small",
  medium = "medium",
  large = "large",
  huge = "huge",
}

export interface Theme {
  colors: { [key: string]: string };
  fonts: {
    regular: { [key: string]: CSSProp };
    bold: { [key: string]: CSSProp };
  };
}

export const theme: Theme = {
  colors: {
    sand: "#c6b99380",
    second_sand: "rgba(198,185,147,0.5)",
    black: "#000000",
    black_medium: "#000000a6",
    black_light: "#e7e7e7",
    gray_medium: "#a8a8a8",
    gray_light: "#ececec",
    gray_prelight: "#d3d3d3",
    green_light: "#d8ffde",
    green: "green",
    brown: "#897f7b",
    mid_brown: "#cbc0bb",
    dark_brown: "#a49c99",
    red: "#f64747",
    white: "#ffffff",
  },
  fonts: {
    regular: {
      [FontsType.small]: css`
        font-family: ibm_plex_monoregular, sans-serif, -apple-system;
        font-size: 12px;
      `,
      [FontsType.medium]: css`
        font-family: ibm_plex_monoregular, sans-serif, -apple-system;
        font-size: 16px;
      `,
      [FontsType.large]: css`
        font-family: ibm_plex_monoregular, sans-serif, -apple-system;
        font-size: 20px;
      `,
      [FontsType.huge]: css`
        font-family: ibm_plex_monoregular, sans-serif, -apple-system;
        font-size: 24px;
      `,
    },
    bold: {
      [FontsType.medium]: css`
        font-family: ibm_plex_monomedium, sans-serif, -apple-system;
        font-size: 16px;
      `,
    },
  },
};
