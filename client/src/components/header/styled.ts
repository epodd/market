import styled from "styled-components";
import { Box, Text } from "src/UI-kit";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 20px 40px 20px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  position: relative;
`;

export const NavigationBlock = styled.nav`
  padding-top: 30px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Navigation = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const NavigationDropdown = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  left: 0;
  right: 0;
  top: 114.5px;
  z-index: 10;
  overflow: hidden;
`;

export const NavigationDropdownOverlay = styled.div`
  position: absolute;
  left: -20px;
  right: -20px;
  bottom: -100vh;
  top: 115px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const DropdownItem = styled(Box)`
  width: fit-content;
  margin-right: 20px;
`;

export const NavItem = styled(Text)<{ active?: boolean }>`
  transition: 0.2s;
  width: fit-content;
  padding: 2px 5px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.black_light : "transparent"};

  &:hover {
    background-color: rgba(198, 185, 147, 0.5);
  }

  &:last-child {
    margin-right: 0;
  }
`;
