import { QueryClient, QueryClientProvider } from "react-query";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  ApolloLink,
} from "@apollo/client";
import React, { ReactNode } from "react";
import authMiddleware from "../middlewares/authMiddleware";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "@ui";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "../contexts/auth/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { FilterProvider } from "../contexts/filter/FilterProvider";
import { createUploadLink } from "apollo-upload-client";
import { CartProvider } from "../contexts/cart/CartProvider";
import { StoreProvider } from "../contexts/store/StoreProvider";
import omitDeep from "omit-deep";
import _ from "lodash";

const queryClient = new QueryClient();

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  credentials: "include",
});

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const mutableVariables = _.cloneDeep(operation.variables);
    operation.variables = omitDeep(
      mutableVariables,
      // @ts-ignore
      "__typename"
    );
  }
  return forward(operation).map((data) => {
    return data;
  });
});

const client = new ApolloClient({
  link: from([cleanTypeName, authMiddleware, uploadLink]),
  cache: new InMemoryCache({
    // typePolicies: {
    //   Item: {
    //     keyFields: ["id"],
    //   },
    // }
  }),
  // { addTypename: false }
});

interface IAllProviders {
  children: string | ReactNode;
}

function AllProviders({ children }: IAllProviders) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              horizontal: "left",
              vertical: "bottom",
            }}
            disableWindowBlurListener
          >
            <BrowserRouter>
              <StoreProvider>
                <AuthProvider>
                  <CartProvider>
                    <FilterProvider>{children}</FilterProvider>
                  </CartProvider>
                </AuthProvider>
              </StoreProvider>
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}

export default AllProviders;
