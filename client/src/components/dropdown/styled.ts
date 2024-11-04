import styled from "styled-components";
import { Box } from "src/UI-kit";

export const HeadDropdown = styled.div<{ w?: string }>`
  min-width: 230px;
  height: fit-content;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray_light};
  width: ${({ w }) => w + "px"};
  border-radius: 7px;
  z-index: 1;
  padding: 15px 0;
`;

export const BodyDropdown = styled.div<{ open?: boolean; h?: number }>`
  min-width: 230px;
  width: fit-content;
  max-height: 250px;
  transition: 0.4s height;
  transition-property: height, margin-top;
  background-color: ${({ theme }) => theme.colors.gray_light};
  height: ${({ open, h }) => (open ? h + "px" : "0px")};
  margin-top: ${({ open, h }) => (open ? "-6px" : "-30px")};
  padding-top: 6px;
  padding-bottom: 15px;
  border-radius: 0 0 7px 7px;
  overflow-y: hidden;
`;

export const SearchBlock = styled(Box)``;
