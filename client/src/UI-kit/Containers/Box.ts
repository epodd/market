import styled, { css } from "styled-components";
import { setProp } from "../utils";
import { CSSProperties } from "react";

const behaviorBox = {
  column: css`
    display: flex;
    flex-direction: column;
  `,
  columnCenter: css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  columnStart: css`
    display: flex;
    flex-direction: column;
    align-items: start;
  `,
  row: css`
    display: flex;
  `,
  rowCenter: css`
    display: flex;
    justify-content: center;
  `,
  rowEnd: css`
    display: flex;
    justify-content: end;
  `,
  rowAlignCenter: css`
    display: flex;
    align-items: center;
  `,
  rowAlignCenterEnd: css`
    display: flex;
    align-items: center;
    justify-content: end;
  `,
  rowBetweenAlign: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  rowBetweenAroundAlign: css`
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
};

export const Box = styled.div<{
  behavior?:
    | "column"
    | "columnCenter"
    | "columnStart"
    | "row"
    | "rowEnd"
    | "rowCenter"
    | "rowBetweenAlign"
    | "rowBetweenAroundAlign"
    | "rowAlignCenter"
    | "rowAlignCenterEnd";
  display?: CSSProperties["display"];
  m?: CSSProperties["margin"];
  p?: CSSProperties["padding"];
  w?: CSSProperties["width"];
  h?: CSSProperties["height"];
  l?: CSSProperties["left"];
  t?: CSSProperties["top"];
  r?: CSSProperties["right"];
  b?: CSSProperties["bottom"];
  flexDirection?: CSSProperties["flexDirection"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  flexGrow?: CSSProperties["flexGrow"];
  position?: CSSProperties["position"];
  fw?: CSSProperties["flexWrap"];
}>`
  ${({ behavior }) =>
    !behavior &&
    css`
      display: ${setProp("inline", "display")};
      flex-direction: ${setProp("row", "flexDirection")};
      justify-content: ${setProp("normal", "justifyContent")};
      align-items: ${setProp("normal", "alignItems")};
    `}

  position: ${setProp("static", "position")};

  ${({ position }) =>
    position !== "static" &&
    css`
      top: ${setProp("auto", "t")};
      left: ${setProp("auto", "l")};
      bottom: ${setProp("auto", "b")};
      right: ${setProp("auto", "r")};
    `}

  flex-wrap: ${setProp("nowrap", "fw")};
  margin: ${setProp("0", "m")};
  padding: ${setProp("0", "p")};
  width: ${setProp("auto", "w")};
  height: ${setProp("auto", "h")};
  flex-grow: ${setProp("0", "flexGrow")};

  ${({ behavior = "row" }) => behaviorBox[behavior]}
`;
