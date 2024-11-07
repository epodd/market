import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type CartResponseType = {
  __typename?: 'CartResponseType';
  products: Array<Maybe<Scalars['String']>>;
  userId: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  createAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  subCategory: Array<Maybe<SubCategoryType>>;
};

export type CategoryType = {
  __typename?: 'CategoryType';
  createAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  subCategory: Array<SubCategoryType>;
};

export type ClothesType = {
  __typename?: 'ClothesType';
  createAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ColorInputType = {
  color: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type File = {
  encoding: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['ID'];
  mimetype: Scalars['String'];
};

export type FilterCategoriesType = {
  __typename?: 'FilterCategoriesType';
  id: Scalars['String'];
  name: Scalars['String'];
  order: Scalars['String'];
};

export type FilterCategoriesTypeInput = {
  color: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type FilterColorsType = {
  __typename?: 'FilterColorsType';
  color: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type FilterDataType = {
  __typename?: 'FilterDataType';
  categories: Array<FilterCategoriesType>;
  colors: Array<FilterColorsType>;
};

export type FilterInputType = {
  categories?: InputMaybe<Array<FilterCategoriesTypeInput>>;
  categoryId: Scalars['String'];
  colors?: InputMaybe<Array<InputMaybe<ColorInputType>>>;
};

export type FilterType = {
  __typename?: 'FilterType';
  filter?: Maybe<FilterDataType>;
  userId: Scalars['String'];
};

export type ImageType = {
  __typename?: 'ImageType';
  key: Scalars['String'];
  location: Scalars['String'];
};

export type LoginType = {
  __typename?: 'LoginType';
  ok: Scalars['Boolean'];
  user: UserAuthorizeType;
};

export type LogoutResponseType = {
  __typename?: 'LogoutResponseType';
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: CategoryType;
  addProduct: ProductResponseType;
  addProductToCart?: Maybe<CartResponseType>;
  addSubCategory: CategoryType;
  addThingToSubCategory: CategoryType;
  deleteCategory: CategoryType;
  deleteSubCategory: CategoryType;
  deleteThingFromSubCategory: CategoryType;
  login: UserResponseType;
  logout: LogoutResponseType;
  putFilter: FilterType;
  registration: UserResponseType;
};


export type MutationAddCategoryArgs = {
  name: Scalars['String'];
};


export type MutationAddProductArgs = {
  data: ProductInputType;
};


export type MutationAddProductToCartArgs = {
  products: Array<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationAddSubCategoryArgs = {
  idCategory: Scalars['String'];
  nameSubCategory: Scalars['String'];
};


export type MutationAddThingToSubCategoryArgs = {
  idCategory: Scalars['String'];
  idSubCategory: Scalars['String'];
  nameThing: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  idCategory: Scalars['String'];
};


export type MutationDeleteSubCategoryArgs = {
  idCategory: Scalars['String'];
  idSubCategory: Scalars['String'];
};


export type MutationDeleteThingFromSubCategoryArgs = {
  idCategory: Scalars['String'];
  idSubCategory: Scalars['String'];
  nameThing: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLogoutArgs = {
  userId: Scalars['String'];
};


export type MutationPutFilterArgs = {
  filter: FilterInputType;
  userId: Scalars['String'];
};


export type MutationRegistrationArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type ProductInputType = {
  color: Scalars['String'];
  description: Scalars['String'];
  gender: Scalars['String'];
  imageFiles: Array<File>;
  kid: Scalars['Boolean'];
  name: Scalars['String'];
  price: Scalars['String'];
  productDetail: Scalars['String'];
  sizes: Array<InputMaybe<SizeType>>;
  typeProduct: Array<Scalars['String']>;
  variantsColor?: InputMaybe<Array<InputMaybe<VariantColorInputType>>>;
};

export type ProductResponseType = {
  __typename?: 'ProductResponseType';
  color: Scalars['String'];
  createAt: Scalars['String'];
  description: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  images: Array<ImageType>;
  kid: Scalars['Boolean'];
  name: Scalars['String'];
  price: Scalars['String'];
  productDetail: Scalars['String'];
  sizes: Array<Scalars['String']>;
  typeProduct: Array<Scalars['String']>;
  variantsColor: Array<VariantColorType>;
};

export type Query = {
  __typename?: 'Query';
  getCart?: Maybe<CartResponseType>;
  getCategories?: Maybe<Array<Maybe<Category>>>;
  getCategory: Category;
  getFilter?: Maybe<FilterType>;
  getProductByFilter: Array<ProductResponseType>;
  getProductByIds: Array<ProductResponseType>;
  getProductByName: Array<ProductResponseType>;
  getProducts: Array<ProductResponseType>;
  getUser?: Maybe<UserResponseType>;
  refreshToken?: Maybe<RefreshTokenResponseType>;
};


export type QueryGetCartArgs = {
  userId: Scalars['String'];
};


export type QueryGetCategoryArgs = {
  idCategory: Scalars['String'];
};


export type QueryGetFilterArgs = {
  userId: Scalars['String'];
};


export type QueryGetProductByFilterArgs = {
  filter: FilterInputType;
};


export type QueryGetProductByIdsArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryGetProductByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetProductsArgs = {
  filter?: InputMaybe<FilterInputType>;
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};

export type RefreshTokenResponseType = {
  __typename?: 'RefreshTokenResponseType';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type SizeType = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type SubCategoryType = {
  __typename?: 'SubCategoryType';
  createAt: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  typeClothes?: Maybe<Array<ClothesType>>;
};

export type UserAuthorizeType = {
  __typename?: 'UserAuthorizeType';
  accessToken: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  refreshToken: Scalars['String'];
  role: Scalars['String'];
};

export type UserResponseType = {
  __typename?: 'UserResponseType';
  errors?: Maybe<Array<ErrorType>>;
  ok: Scalars['Boolean'];
  user: UserAuthorizeType;
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['String'];
};

export type VariantColorInputType = {
  color: Scalars['String'];
  id: Scalars['String'];
};

export type VariantColorType = {
  __typename?: 'VariantColorType';
  color: Scalars['String'];
  id: Scalars['String'];
};

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'UserResponseType', ok: boolean, user: { __typename?: 'UserAuthorizeType', id: string, name: string, email: string, role: string }, errors?: Array<{ __typename?: 'ErrorType', path: string, message: string }> | null } | null };

export type LogoutMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponseType', userId: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponseType', ok: boolean, user: { __typename?: 'UserAuthorizeType', id: string, accessToken: string, refreshToken: string, email: string, name: string, role: string }, errors?: Array<{ __typename?: 'ErrorType', path: string, message: string }> | null } };

export type RegistrationMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegistrationMutation = { __typename?: 'Mutation', registration: { __typename?: 'UserResponseType', ok: boolean, user: { __typename?: 'UserAuthorizeType', id: string, accessToken: string, refreshToken: string, email: string, name: string, role: string }, errors?: Array<{ __typename?: 'ErrorType', path: string, message: string }> | null } };

export type AddProductMutationVariables = Exact<{
  data: ProductInputType;
}>;


export type AddProductMutation = { __typename?: 'Mutation', addProduct: { __typename?: 'ProductResponseType', id: string } };

export type GetProductsQueryVariables = Exact<{
  filter?: InputMaybe<FilterInputType>;
}>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'ProductResponseType', name: string, id: string, price: string, images: Array<{ __typename?: 'ImageType', key: string, location: string }> }> };

export type GetProductByIdsQueryVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetProductByIdsQuery = { __typename?: 'Query', getProductByIds: Array<{ __typename?: 'ProductResponseType', name: string, color: string, id: string, description: string, productDetail: string, sizes: Array<string>, price: string, kid: boolean, gender: string, images: Array<{ __typename?: 'ImageType', key: string, location: string }>, variantsColor: Array<{ __typename?: 'VariantColorType', id: string, color: string }> }> };

export type GetProductByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetProductByNameQuery = { __typename?: 'Query', getProductByName: Array<{ __typename?: 'ProductResponseType', id: string, name: string, color: string, images: Array<{ __typename?: 'ImageType', key: string, location: string }> }> };


export const GetUserDocument = gql`
    query GetUser($userId: String!) {
  getUser(userId: $userId) {
    user {
      id
      name
      email
      role
    }
    ok
    errors {
      path
      message
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout($userId: String!) {
  logout(userId: $userId) {
    userId
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      accessToken
      refreshToken
      email
      name
      role
    }
    ok
    errors {
      path
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegistrationDocument = gql`
    mutation Registration($name: String!, $email: String!, $password: String!) {
  registration(name: $name, email: $email, password: $password) {
    user {
      id
      accessToken
      refreshToken
      email
      name
      role
    }
    ok
    errors {
      path
      message
    }
  }
}
    `;
export type RegistrationMutationFn = Apollo.MutationFunction<RegistrationMutation, RegistrationMutationVariables>;

/**
 * __useRegistrationMutation__
 *
 * To run a mutation, you first call `useRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registrationMutation, { data, loading, error }] = useRegistrationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<RegistrationMutation, RegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistrationMutation, RegistrationMutationVariables>(RegistrationDocument, options);
      }
export type RegistrationMutationHookResult = ReturnType<typeof useRegistrationMutation>;
export type RegistrationMutationResult = Apollo.MutationResult<RegistrationMutation>;
export type RegistrationMutationOptions = Apollo.BaseMutationOptions<RegistrationMutation, RegistrationMutationVariables>;
export const AddProductDocument = gql`
    mutation AddProduct($data: ProductInputType!) {
  addProduct(data: $data) {
    id
  }
}
    `;
export type AddProductMutationFn = Apollo.MutationFunction<AddProductMutation, AddProductMutationVariables>;

/**
 * __useAddProductMutation__
 *
 * To run a mutation, you first call `useAddProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductMutation, { data, loading, error }] = useAddProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddProductMutation(baseOptions?: Apollo.MutationHookOptions<AddProductMutation, AddProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductMutation, AddProductMutationVariables>(AddProductDocument, options);
      }
export type AddProductMutationHookResult = ReturnType<typeof useAddProductMutation>;
export type AddProductMutationResult = Apollo.MutationResult<AddProductMutation>;
export type AddProductMutationOptions = Apollo.BaseMutationOptions<AddProductMutation, AddProductMutationVariables>;
export const GetProductsDocument = gql`
    query GetProducts($filter: ProductsFilterInputType) {
  getProducts(filter: $filter) {
    name
    id
    images {
      key
      location
    }
    price
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductByIdsDocument = gql`
    query GetProductByIds($ids: [String!]!) {
  getProductByIds(ids: $ids) {
    name
    color
    id
    description
    productDetail
    sizes
    images {
      key
      location
    }
    price
    kid
    gender
    variantsColor {
      id
      color
    }
  }
}
    `;

/**
 * __useGetProductByIdsQuery__
 *
 * To run a query within a React component, call `useGetProductByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetProductByIdsQuery(baseOptions: Apollo.QueryHookOptions<GetProductByIdsQuery, GetProductByIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByIdsQuery, GetProductByIdsQueryVariables>(GetProductByIdsDocument, options);
      }
export function useGetProductByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByIdsQuery, GetProductByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByIdsQuery, GetProductByIdsQueryVariables>(GetProductByIdsDocument, options);
        }
export type GetProductByIdsQueryHookResult = ReturnType<typeof useGetProductByIdsQuery>;
export type GetProductByIdsLazyQueryHookResult = ReturnType<typeof useGetProductByIdsLazyQuery>;
export type GetProductByIdsQueryResult = Apollo.QueryResult<GetProductByIdsQuery, GetProductByIdsQueryVariables>;
export const GetProductByNameDocument = gql`
    query GetProductByName($name: String!) {
  getProductByName(name: $name) {
    id
    name
    color
    images {
      key
      location
    }
  }
}
    `;

/**
 * __useGetProductByNameQuery__
 *
 * To run a query within a React component, call `useGetProductByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetProductByNameQuery(baseOptions: Apollo.QueryHookOptions<GetProductByNameQuery, GetProductByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByNameQuery, GetProductByNameQueryVariables>(GetProductByNameDocument, options);
      }
export function useGetProductByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByNameQuery, GetProductByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByNameQuery, GetProductByNameQueryVariables>(GetProductByNameDocument, options);
        }
export type GetProductByNameQueryHookResult = ReturnType<typeof useGetProductByNameQuery>;
export type GetProductByNameLazyQueryHookResult = ReturnType<typeof useGetProductByNameLazyQuery>;
export type GetProductByNameQueryResult = Apollo.QueryResult<GetProductByNameQuery, GetProductByNameQueryVariables>;