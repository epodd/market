import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString,
} from "graphql/index";
import { GraphQLUpload } from "graphql-upload";

const VariantColorInputType = new GraphQLInputObjectType({
  name: "VariantColorInputType",
  fields: {
    id: { type: GraphQLString },
    color: { type: GraphQLString },
  },
});

const VariantColorType = new GraphQLObjectType({
  name: "VariantColorType",
  fields: {
    id: { type: GraphQLString },
    color: { type: GraphQLString },
  },
});

const ImageType = new GraphQLObjectType({
  name: "ImageType",
  fields: {
    key: { type: GraphQLString },
    location: { type: GraphQLString },
  },
});

export const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    productDetail: { type: GraphQLString },
    id: { type: GraphQLString },
    kid: { type: GraphQLBoolean },
    price: { type: GraphQLString },
    gender: { type: GraphQLString },
    color: { type: GraphQLString },
    createAt: { type: GraphQLString },
    images: { type: new GraphQLList(ImageType) },
    sizes: { type: new GraphQLList(GraphQLString) },
    typeProduct: { type: new GraphQLList(GraphQLString) },
    variantsColor: { type: new GraphQLList(VariantColorType) },
  }),
});

const Color = new GraphQLInputObjectType({
  name: "Color",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    color: { type: GraphQLString },
  }),
});

export const Filter = new GraphQLInputObjectType({
  name: "Filter",
  fields: () => ({
    categoryId: { type: GraphQLString },
    colors: { type: new GraphQLList(Color) },
  }),
});

const UploadType = new GraphQLScalarType({
  name: "UploadType",
  serialize: (file: GraphQLScalarType) => GraphQLUpload.serialize(file),
  parseValue: (file: GraphQLScalarType) => GraphQLUpload.parseValue(file),
  parseLiteral: (file: any) => GraphQLUpload.parseLiteral(file),
});

export const ProductTypeInput = new GraphQLInputObjectType({
  name: "DataType",
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    productDetail: { type: GraphQLString },
    id: { type: GraphQLString },
    kid: { type: GraphQLBoolean },
    price: { type: GraphQLString },
    gender: { type: GraphQLString },
    color: { type: GraphQLString },
    imageFiles: { type: new GraphQLList(UploadType) },
    sizes: { type: new GraphQLList(GraphQLString) },
    typeProduct: { type: new GraphQLList(GraphQLString) },
    variantsColor: {
      type: new GraphQLList(VariantColorInputType),
      defaultValue: [],
    },
  }),
});
