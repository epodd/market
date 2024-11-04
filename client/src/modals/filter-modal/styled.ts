import styled from "styled-components";

export const FilterWrapper = styled.div`
  position: fixed;
  right: 20px;
  top: 135px;
  z-index: 10000;
`;

export const FilterContent = styled.div`
  padding: 15px;
  box-sizing: border-box;
  width: 400px;
  min-height: 500px;
  border-radius: 7px;
  background-color: rgba(225, 225, 225, 0.6);
  backdrop-filter: blur(70px);
`;
