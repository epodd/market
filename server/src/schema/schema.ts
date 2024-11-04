import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { AuthMutations, AuthQueries, authTypeDefs } from "./auth/auth";
import { CategoryMutations, CategoryQueries } from "./category/category";
import {
  ProductQueries,
  ProductMutations,
  productTypeDefs,
} from "./product/product";
import { ColorMutations, ColorQueries } from "./color/color";
import { FilterMutations, FilterQueries } from "./filter/filter";
import { CartMutations, CartQueries, cartTypeDefs } from "./cart/cart";
import { OfferMutations, OfferQueries } from "./offer/offer";
import { mergeTypeDefs } from "@graphql-tools/merge";

// const query = new GraphQLObjectType({
//   name: "Query",
//   fields: {
//     ...AuthQueries,
//     ...CategoryQueries,
//     ...ProductQueries,
//     ...ColorQueries,
//     ...FilterQueries,
//     ...CartQueries,
//     ...OfferQueries,
//   },
// });
//
// const mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     ...AuthMutations,
//     ...CategoryMutations,
//     ...ProductMutations,
//     ...ColorMutations,
//     ...FilterMutations,
//     ...CartMutations,
//     ...OfferMutations,
//   },
// });
//
// export default new GraphQLSchema({
//   query,
//   mutation,
// });

export const resolvers = {
  Mutation: { ...AuthMutations, ...CartMutations, ...ProductMutations },
  Query: { ...AuthQueries, ...CartQueries, ...ProductQueries },
};

export const typeDefs = mergeTypeDefs([
  authTypeDefs,
  cartTypeDefs,
  productTypeDefs,
]);
