import styled from "styled-components";
import { Box } from "../../UI-kit";

export const Wrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: fit-content;
`;

export const ImageBlock = styled.div`
  width: 65%;
  position: relative;
  z-index: 1000;
`;

export const BlockSizer = styled.div`
  position: relative;
`;

export const CountImages = styled.div`
  left: 100px;
  top: 250px;
  position: fixed;
`;

export const InfoBlock = styled.div`
  width: 35%;
  top: 180px;
  right: 0;
  box-sizing: border-box;
  padding-top: 70px;
  padding-left: 30px;
`;

export const Image = styled.img`
  width: 100%;
  object-fit: contain;
  cursor: pointer;
`;

export const ColorItem = styled.div<{
  color?: string;
  active?: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin: 5px 5px 0 0;
  position: relative;
  border: ${({ theme, active }) =>
    active ? `1px solid ${theme.colors.black}` : "none"};

  &:after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    border-radius: 4px;
    background-color: ${({ color }) => color || "black"};
  }
`;

export const SizeItem = styled.div<{ active?: boolean }>`
  width: 32px;
  height: 42px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.brown : theme.colors.black_light};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: 0.4s;
  cursor: pointer;
  margin: 10px 10px 0 0;
  transform: ${({ active }) => (active ? "scale(1.1)" : "scale(1)")};

  &:hover {
    background-color: ${({ theme }) => theme.colors.brown};
  }
`;
