import styled from "styled-components";

export const FilterItem = styled.div<{ active?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-radius: 6px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.green_light : theme.colors.gray_prelight};
  margin-right: 10px;
  margin-bottom: 10px;
`;
