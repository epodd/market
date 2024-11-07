import React from "react";
import styled, { keyframes } from "styled-components";

const anim1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;
const anim3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;
const anim2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const LdsElem = styled.div`
  color: #1c4c5b;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & > div:nth-child(1) {
    left: 8px;
    animation-name: ${anim1};
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
  }
  & > div:nth-child(2) {
    left: 8px;
    animation-name: ${anim2};
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
  }
  & > div:nth-child(3) {
    left: 32px;
    animation-name: ${anim2};
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
  }
  & > div:nth-child(4) {
    left: 56px;
    animation-name: ${anim3};
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
  }
`;

const AnimElement = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 33.33333px;
  width: 13.33333px;
  height: 13.33333px;
  border-radius: 50%;
  background: currentColor;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;

export const Spinner = () => {
  return (
    <div>
      <LdsElem>
        <AnimElement />
        <AnimElement />
        <AnimElement />
        <AnimElement />
      </LdsElem>
    </div>
  );
};
