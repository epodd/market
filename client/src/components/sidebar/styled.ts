import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  border-right: 1px solid black;
  padding: 50px 30px;
  box-sizing: border-box;
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Navigation = styled.nav`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NavigationItem = styled.div<{ active?: boolean }>`
  padding: 5px 15px;
  display: flex;
  align-items: center;

  &:before {
    content: "";
    margin-right: 10px;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    background-color: black;
    display: ${({ active }) => (active ? "block" : "none")};
  }

  &:after {
    content: "";
    margin-left: 10px;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    background-color: black;
    display: ${({ active }) => (active ? "block" : "none")};
  }
`;
