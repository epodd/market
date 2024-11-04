import styled from "styled-components";

export const HiddenCheckbox = styled.input.attrs(({ type }) => ({
  type,
}))<any>`
  display: none;
`;

export const Checkbox = styled.div<any>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid black;
  position: relative;
  cursor: pointer;

  &:after {
    content: "";
    transition: 0.4s opacity;
    opacity: ${({ value }) => (value ? 1 : 0)};
    background-color: ${({ theme }) => theme.colors.black};
    position: absolute;
    border-radius: 2px;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    z-index: 1;
  }
`;
