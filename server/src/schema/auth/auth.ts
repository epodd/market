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

