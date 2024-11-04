import { GraphQLString, GraphQLList } from "graphql";
import productService from "../../services/product/product-service";
import { Filter, ProductType, ProductTypeInput } from "./graphql-types";
import { gql } from "apollo-server-express";
import { Upload } from "graphql-upload";

export const productTypeDefs = gql`
  scalar Upload

  input VariantColorInputType {
    id: String!
    color: String!
  }

  type VariantColorType {
    id: String!
    color: String!
  }

  type ImageType {
    key: String!
    location: String!
  }

  input ColorInputType {
    id: String!
    name: String!
    color: String!
  }

  input FilterInputType {
    categoryId: String!
    colors: [ColorInputType]
  }

  input File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  input SizeType {
    id: String!
    name: String!
  }

  input ProductInputType {
    name: String!
    description: String!
    productDetail: String!
    kid: Boolean!
    price: String!
    gender: String!
    color: String!
    imageFiles: [File!]!
    sizes: [SizeType]!
    typeProduct: [String!]!
    variantsColor: [VariantColorInputType]
  }

  type ProductResponseType {
    name: String!
    description: String!
    productDetail: String!
    id: String!
    kid: Boolean!
    price: String!
    gender: String!
    color: String!
    createAt: String!
    images: [ImageType!]!
    sizes: [String!]!
    typeProduct: [String!]!
    variantsColor: [VariantColorType!]!
  }

  type Query {
    getProducts(filter: FilterInputType): [ProductResponseType!]!
    getProductByName(name: String!): [ProductResponseType!]!
    getProductByFilter(filter: FilterInputType!): [ProductResponseType!]!
    getProductByIds(ids: [String!]!): [ProductResponseType!]!
  }

  type Mutation {
    addProduct(data: ProductInputType!): ProductResponseType!
  }
`;

export const ProductQueries = {
  getProducts: productService.getProducts,
  getProductByName: productService.getProductByName,
  getProductByFilter: productService.getProductByFilter,
  getProductByIds: productService.getProductByIds,
};

export const ProductMutations = {
  addProduct: productService.addProduct,
};

// export const ProductQueries = {
//   getProducts: {
//     type: new GraphQLList(ProductType),
//     args: {
//       filter: { type: Filter },
//     },
//     resolve: productService.getProducts,
//   },
//   getProductByName: {
//     type: new GraphQLList(ProductType),
//     args: {
//       name: { type: GraphQLString },
//     },
//     resolve: productService.getProductByName,
//   },
//   getProductByFilter: {
//     type: new GraphQLList(ProductType),
//     args: {
//       filter: { type: Filter },
//     },
//     resolve: productService.getProductByFilter,
//   },
//   getProductByIds: {
//     type: new GraphQLList(ProductType),
//     args: {
//       ids: { type: new GraphQLList(GraphQLString) },
//     },
//     resolve: productService.getProductByIds,
//   },
// };
//
// export const ProductMutations = {
//   addProduct: {
//     type: ProductType,
//     args: {
//       data: { type: ProductTypeInput },
//     },
//     resolve: productService.addProduct,
//   },
// };
