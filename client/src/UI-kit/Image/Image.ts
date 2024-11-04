import styled from "styled-components";
import { CSSProperties } from "react";
import { setProp } from "../utils";

export const Image = styled.img<{
  w?: CSSProperties["width"];
  h?: CSSProperties["height"];
  of?: CSSProperties["objectFit"];
  m?: CSSProperties["margin"];
}>`
  margin: ${setProp("0", "m")};
  width: ${setProp("auto", "w")};
  height: ${setProp("auto", "h")};
  object-fit: ${setProp("fill", "of")};
`;
