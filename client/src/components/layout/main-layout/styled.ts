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
