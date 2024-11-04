import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInputObjectType,
} from "graphql";
import colorService from "../../services/color/color-service";

const ColorType = new GraphQLObjectType({
  name: "ColorType",
  fields: () => ({
    name: { type: GraphQLString },
    color: { type: GraphQLString },
    id: { type: GraphQLString },
    createAt: { type: GraphQLString },
  }),
});

const NewColorType = new GraphQLInputObjectType({
  name: "NewColorType",
  fields: () => ({
    name: { type: GraphQLString },
    color: { type: GraphQLString },
  }),
});

export const ColorMutations = {
  addColor: {
    type: ColorType,
    args: {
      data: {
        type: NewColorType,
      },
    },
    resolve: colorService.addColor,
  },

  deleteColor: {
    type: ColorType,
    args: {
      colorId: {
        type: GraphQLString,
      },
    },
    resolve: colorService.deleteColor,
  },
};

export const ColorQueries = {
  getColors: {
    type: new GraphQLList(ColorType),
    args: {},
    resolve: colorService.getColors,
  },
};
