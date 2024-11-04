import React, { CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { setProp } from "../../UI-kit/utils";

const IconElement = styled(FontAwesomeIcon)<{
  cursor?: CSSProperties["cursor"];
  s?: CSSProperties["height"];
  m?: CSSProperties["margin"];
}>`
  cursor: ${setProp("auto", "cursor")};
  height: ${setProp("16px", "s")};
  margin: ${setProp("0", "m")};
`;

export const Icon = (props: any) => {
  return <IconElement {...props} />;
};
