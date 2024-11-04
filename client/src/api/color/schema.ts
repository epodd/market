import { gql } from "@apollo/client";

export const ADD_COLOR = gql`
  mutation AddColor($data: NewColorType!) {
    addColor(data: $data) {
      name
      color
      id
    }
  }
`;

export const DELETE_COLOR = gql`
  mutation DeleteColor($colorId: String!) {
    deleteColor(colorId: $colorId) {
      name
      color
      id
    }
  }
`;

export const GET_COLORS = gql`
  query GetColors {
    getColors {
      name
      color
      id
    }
  }
`;
