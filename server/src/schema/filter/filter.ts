import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
} from "graphql";
import filterService from "../../services/filter/filter-service";

const FilterCategoriesType = new GraphQLObjectType({
  name: "FilterCategoriesType",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    order: { type: GraphQLString },
  }),
});

const FilterColorsType = new GraphQLObjectType({
  name: "FilterColorsType",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    color: { type: GraphQLString },
  }),
});

export const FilterDataType = new GraphQLObjectType({
  name: "FilterDataType",
  fields: () => ({
    categories: { type: new GraphQLList(FilterCategoriesType) },
    colors: { type: new GraphQLList(FilterColorsType) },
  }),
});

const FilterType = new GraphQLObjectType({
  name: "FilterType",
  fields: () => ({
    userId: { type: GraphQLString },
    filter: { type: FilterDataType },
  }),
});

const FilterCategoriesTypeInput = new GraphQLInputObjectType({
  name: "FilterCategoriesTypeInput",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    order: { type: GraphQLString },
  }),
});

const FilterColorsTypeInput = new GraphQLInputObjectType({
  name: "FilterColorsTypeInput",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    color: { type: GraphQLString },
  }),
});

const FilterTypeInput = new GraphQLInputObjectType({
  name: "FilterTypeInput",
  fields: () => ({
    categories: { type: new GraphQLList(FilterCategoriesTypeInput) },
    colors: { type: new GraphQLList(FilterColorsTypeInput) },
  }),
});

export const FilterMutations = {
  putFilter: {
    type: FilterType,
    args: {
      filter: { type: FilterTypeInput },
      userId: { type: GraphQLString },
    },
    resolve: filterService.putFilter,
  },
};

export const FilterQueries = {
  getFilter: {
    type: FilterType,
    args: { userId: { type: GraphQLString } },
    resolve: filterService.getFilterByUserId,
  },
};
