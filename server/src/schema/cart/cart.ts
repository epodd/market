import { GraphQLString, GraphQLObjectType, GraphQLList } from "graphql";
import cartService from "../../services/cart/cart-service";
import { gql } from "apollo-server-express";

export const cartTypeDefs = gql`
  type CartResponseType {
    userId: String!
    products: [String!]!
  }

  type Query {
    getCart(userId: String!): CartResponseType
  }

  type Mutation {
    addProductToCart(userId: String!, products: [String!]!): CartResponseType
  }
`;

export const CartQueries = {
  getCart: cartService.getCart,
};

export const CartMutations = {
  addProductToCart: cartService.addProductToCart,
};

