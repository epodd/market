import styled from "styled-components";
import { Icon } from "../icons/icons";
export const HeadDropdown = styled.div`
  width: 230px;
  height: fit-content;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray_light};
  border-radius: 7px;
  z-index: 1;
  padding: 15px 0;
`;

export const BodyDropdown = styled.div<{ open?: boolean; h?: number }>`
  width: 230px;
  max-height: 250px;
  overflow-y: scroll;
  transition: 0.4s height;
  transition-property: height, margin-top;
  background-color: ${({ theme }) => theme.colors.gray_light};
  height: ${({ open, h }) => (open ? h + "px" : "0px")};
  margin-top: ${({ open, h }) => (open ? "-6px" : "-21px")};
  padding-top: 6px;
  padding-bottom: 15px;
  border-radius: 0 0 7px 7px;
`;

export const BodyDropdownItem = styled.div`
  padding: 3px 10px;
`;

export const ActiveIcon = styled(Icon)<{ open: boolean }>`
  transition: 0.4s;
  transform: ${({ open }) => (open ? "rotate(-180deg)" : "rotate(0deg)")};
  cursor: pointer;
`;
