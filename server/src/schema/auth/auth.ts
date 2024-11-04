import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLList,
  buildSchema,
} from "graphql";
import userService from "../../services/user/user-service";
import { ErrorType } from "../../types/error";
import { gql } from "apollo-server-express";

export const authTypeDefs = gql`
  type RefreshTokenResponseType {
    refreshToken: String!
    accessToken: String!
  }

  type LogoutResponseType {
    userId: String!
  }

  type UserType {
    name: String!
    id: String!
    email: String!
    role: String!
  }

  type UserAuthorizeType {
    name: String!
    id: String!
    refreshToken: String!
    accessToken: String!
    email: String!
    role: String!
  }

  type LoginType {
    user: UserAuthorizeType!
    ok: Boolean!
  }

  type ErrorType {
    path: String!
    message: String!
  }

  type UserResponseType {
    user: UserAuthorizeType!
    ok: Boolean!
    errors: [ErrorType!]
  }

  type Query {
    refreshToken: RefreshTokenResponseType
    getUser(userId: String!): UserResponseType
  }

  type Mutation {
    login(email: String!, password: String!): UserResponseType!
    registration(
      name: String!
      email: String!
      password: String!
    ): UserResponseType!
    logout(userId: String!): LogoutResponseType!
  }
`;

export const AuthQueries = {
  refreshToken: userService.refreshToken,
  getUser: userService.getUser,
};

export const AuthMutations = {
  login: userService.login,
  registration: userService.registration,
  logout: userService.logout,
};

//
// const AuthorizeType = new GraphQLObjectType({
//   name: "AuthorizeType",
//   fields: () => ({
//     name: { type: GraphQLString },
//     id: { type: GraphQLString },
//     accessToken: { type: GraphQLString },
//     refreshToken: { type: GraphQLString },
//     email: { type: GraphQLString },
//     role: { type: GraphQLString },
//   }),
// });
//
// const UserType = new GraphQLObjectType({
//   name: "UserType",
//   fields: () => ({
//     name: { type: GraphQLString },
//     id: { type: GraphQLString },
//     email: { type: GraphQLString },
//     role: { type: GraphQLString },
//   }),
// });
//
// const AuthUserType = new GraphQLObjectType({
//   name: "AuthUserType",
//   fields: () => ({
//     user: { type: AuthorizeType },
//     ok: { type: GraphQLBoolean },
//     errors: { type: new GraphQLList(ErrorType) },
//   }),
// });
//
// const TokenType = new GraphQLObjectType({
//   name: "TokenType",
//   fields: () => ({
//     userId: { type: GraphQLString },
//     refreshToke: { type: GraphQLString },
//   }),
// });
//
// const RefreshTokenType = new GraphQLObjectType({
//   name: "RefreshTokenType",
//   fields: () => ({
//     accessToken: { type: GraphQLString },
//     refreshToken: { type: GraphQLString },
//   }),
// });

// export const AuthMutations = {
//   login: {
//     type: AuthUserType,
//     args: {
//       email: {
//         type: GraphQLString,
//       },
//       password: {
//         type: GraphQLString,
//       },
//     },
//     resolve: userService.login,
//   },
//   registration: {
//     type: AuthUserType,
//     args: {
//       name: {
//         type: GraphQLString,
//       },
//       email: {
//         type: GraphQLString,
//       },
//       password: {
//         type: GraphQLString,
//       },
//     },
//     resolve: userService.registration,
//   },
//   logout: {
//     type: TokenType,
//     args: {
//       userId: {
//         type: GraphQLString,
//       },
//     },
//     resolve: userService.logout,
//   },
//   setAdmin: {
//     type: UserType,
//     args: {
//       userId: {
//         type: GraphQLString,
//       },
//     },
//     resolve: userService.setAdmin,
//   },
// };

// export const AuthQueries = {
//   refreshToken: {
//     type: RefreshTokenType,
//     resolve: userService.refreshToken,
//   },
//   getUser: {
//     type: AuthUserType,
//     args: {
//       userId: {
//         type: GraphQLString,
//       },
//     },
//     resolve: userService.getUser,
//   },
// };
