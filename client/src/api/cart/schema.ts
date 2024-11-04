import { gql } from "@apollo/client";

export const UPDATE_CART = gql`
  mutation AddProductToCart($userId: String!, $products: [String]!) {
    addProductToCart(userId: $userId, products: $products) {
      userId
      products
    }
  }
`;

export const GET_CART = gql`
  query GetCart($userId: String!) {
    getCart(userId: $userId) {
      userId
      products
    }
  }
`;
