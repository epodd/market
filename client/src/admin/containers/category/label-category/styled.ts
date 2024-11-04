import styled from "styled-components";

export const LabelCategory = styled.div<{ active?: boolean }>`
  padding: 5px 10px;
  width: fit-content;
  border-radius: 7px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.green_light : theme.colors.gray_light};
  cursor: pointer;
  display: flex;
  align-items: center;

  &:last-of-type {
    margin-right: 0;
  }
`;

export const Cross = styled.div`
  transform: rotate(45deg);
  font-size: 20px;
  transition: 0.3s transform;
  margin-bottom: 3px;

  &:hover {
    transform: scale(1.3) rotate(45deg);
  }
`;
