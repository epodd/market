import styled from "styled-components";
import { Box } from "../../../UI-kit";

export const ProductWrapper = styled(Box)`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e1e1;
  margin-left: -1px;
  margin-top: -1px;
  cursor: pointer;
  position: relative;
`;
export const Image = styled.img`
  width: 300px;
  height: 330px;
  object-fit: cover;
`;

export const InfoBlock = styled.div`
  padding: 8px 12px;
  width: 300px;
  height: 70px;
  box-sizing: border-box;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;
