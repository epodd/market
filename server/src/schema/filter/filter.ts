import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
} from "graphql";
import filterService from "../../services/filter/filter-service";
import { gql } from 'apollo-server-express'
//
// const FilterCategoriesType = new GraphQLObjectType({
//   name: "FilterCategoriesType",
//   fields: () => ({
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     order: { type: GraphQLString },
//   }),
// });
//
// const FilterColorsType = new GraphQLObjectType({
//   name: "FilterColorsType",
//   fields: () => ({
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     color: { type: GraphQLString },
//   }),
// });
//
// export const FilterDataType = new GraphQLObjectType({
//   name: "FilterDataType",
//   fields: () => ({
//     categories: { type: new GraphQLList(FilterCategoriesType) },
//     colors: { type: new GraphQLList(FilterColorsType) },
//   }),
// });
//
// const FilterType = new GraphQLObjectType({
//   name: "FilterType",
//   fields: () => ({
//     userId: { type: GraphQLString },
//     filter: { type: FilterDataType },
//   }),
// });
//
// const FilterCategoriesTypeInput = new GraphQLInputObjectType({
//   name: "FilterCategoriesTypeInput",
//   fields: () => ({
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     order: { type: GraphQLString },
//   }),
// });
//
// const FilterColorsTypeInput = new GraphQLInputObjectType({
//   name: "FilterColorsTypeInput",
//   fields: () => ({
//     id: { type: GraphQLString },
//     name: { type: GraphQLString },
//     color: { type: GraphQLString },
//   }),
// });
//
// const FilterTypeInput = new GraphQLInputObjectType({
//   name: "FilterTypeInput",
//   fields: () => ({
//     categories: { type: new GraphQLList(FilterCategoriesTypeInput) },
//     colors: { type: new GraphQLList(FilterColorsTypeInput) },
//   }),
// });

export const filterTypeDefs = gql`
    input FilterCategoriesTypeInput {
        id: String!
        name: String!
        order: String!
    }
    
    input FilterInputType {
        categories: [FilterCategoriesTypeInput]
        colors: [ColorInputType]
    }
    
    type FilterColorsType {
        id: String!
        name: String!
        color: String!
    }
    
    type FilterCategoriesType {
        id: String!
        name: String!
        order: String!
    }
    
    type FilterDataType {
        categories: [FilterCategoriesType!]!
        colors: [FilterColorsType!]!
    }
    
    type FilterType {
        userId: String!
        filter: FilterDataType
    }
    
    type Mutation {
        putFilter(filter: FilterInputType!, userId: String!): FilterType!
    }
    
    type Query {
        getFilter(userId: String!): FilterType
    }
`

export const FilterQueries = {
  getFilter: filterService.getFilterByUserId,
};

export const FilterMutations = {
  putFilter: filterService.putFilter,
};