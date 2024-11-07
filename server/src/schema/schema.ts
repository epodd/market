import { AuthMutations, AuthQueries, authTypeDefs } from "./auth/auth";
import { CategoriesMutations, CategoriesQueries, categoriesTypeDefs } from './category/category'
import {
  ProductQueries,
  ProductMutations,
  productTypeDefs,
} from "./product/product";
import { FilterMutations, FilterQueries, filterTypeDefs } from './filter/filter'
import { CartMutations, CartQueries, cartTypeDefs } from "./cart/cart";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { ColorQueries, ColorsMutations, colorsTypeDefs } from './color/color'

export const resolvers = {
  Mutation: {
    ...AuthMutations,
    ...CartMutations,
    ...ProductMutations,
    ...CategoriesMutations,
    ...FilterMutations,
    ...ColorsMutations
  },
  Query: {
    ...AuthQueries,
    ...CartQueries,
    ...ProductQueries,
    ...CategoriesQueries,
    ...FilterQueries,
    ...ColorQueries
  },
};

export const typeDefs = mergeTypeDefs([
  authTypeDefs,
  cartTypeDefs,
  productTypeDefs,
  categoriesTypeDefs,
  filterTypeDefs,
  colorsTypeDefs
]);
