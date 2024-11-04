import { GraphQLString, GraphQLObjectType, GraphQLList } from "graphql";
import cartService from "../../services/cart/cart-service";
import { gql } from "apollo-server-express";

export const cartTypeDefs = gql`
  type CartResponseType {
    userId: String!
    products: [String]!
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

// const CartType = new GraphQLObjectType({
//   name: "CartType",
//   fields: () => ({
//     userId: { type: GraphQLString },
//     products: { type: new GraphQLList(GraphQLString) },
//   }),
// });
//
//
// export const CartQueries = {
//   getCart: {
//     type: CartType,
//     args: {
//       userId: {
//         type: GraphQLString,
//       },
//     },
//     resolve: cartService.getCart,
//   },
// };
//
// export const CartMutations = {
//   addProductToCart: {
//     type: CartType,
//     args: {
//       products: {
//         type: new GraphQLList(GraphQLString),
//       },
//       userId: {
//         type: GraphQLString,
//       },
//     },
//     resolve: cartService.addProductToCart,
//   },
// };
