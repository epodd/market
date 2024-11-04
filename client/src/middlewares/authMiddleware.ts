import { ApolloLink } from "@apollo/client";
import Cookies from "js-cookie";

const authMiddleware = new ApolloLink((operation, forward) => {
  const customHeaders = operation.getContext().hasOwnProperty("headers")
    ? operation.getContext().headers
    : {};
  operation.setContext({
    headers: {
      ...customHeaders,
      authorization: `Bearer ${Cookies.get("access-token")}`,
    },
  });

  return forward(operation);
});

export default authMiddleware;
