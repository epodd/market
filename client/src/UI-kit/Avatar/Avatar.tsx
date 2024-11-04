import styled from "styled-components";

export const Avatar = styled.img<{ s?: string }>`
  width: ${({ s }) => s || "20px"};
  height: ${({ s }) => s || "20px"};
  border-radius: 50%;
  border: 1px solid black;
`;
