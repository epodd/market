import styled from "styled-components";

export const Wrapper = styled.div<{ bgcolor: string }>`
  width: 100vw;
  min-height: 100vh;
  height: fit-content;
  background-color: ${({ bgcolor }) => bgcolor};
`;

export const Main = styled.main`
  position: relative;
`;

export const HeaderWrapper = styled.div`
  z-index: 1;
  position: sticky;
  top: 0;
`;

export const SpinnerOverlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.37);
`;

export const SpinnerWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;
