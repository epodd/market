import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CART, UPDATE_CART } from "./schema";

const useUpdateCart = () => useMutation(UPDATE_CART);
const useGetCart = () => useLazyQuery(GET_CART);

export { useUpdateCart, useGetCart };
