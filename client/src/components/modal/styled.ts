import styled from "styled-components";

export const ModalWrapper = styled.div<{ top?: string }>`
  position: fixed;
  right: 20px;
  top: ${({ top }) => top || "175px"};
  z-index: 10000;
`;

export const ModalContent = styled.div`
  padding: 15px;
  box-sizing: border-box;
  width: 400px;
  max-height: 500px;
  height: fit-content;
  border-radius: 7px;
  background-color: rgba(225, 225, 225, 0.6);
  backdrop-filter: blur(9px);
  position: relative;
  transition: 0.4s max-height;
`;

export const ModalBlockLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  border-radius: 7px;
  background-color: rgba(255, 255, 255, 0.75);
`;
