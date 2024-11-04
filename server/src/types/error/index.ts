import { GraphQLObjectType, GraphQLString } from "graphql/index";

export const ErrorType = new GraphQLObjectType({
  name: "ErrorType",
  fields: () => ({
    path: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});
