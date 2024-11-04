import { actionCreator } from "../utils";
import {
  AddCartPayloadType,
  CartActionNames,
  InitializeCartPayloadType,
  RemoveFromCartPayloadType,
} from "./types";

export const addToCartAction = actionCreator<AddCartPayloadType>(
  CartActionNames.ADD_TO_CART
);

export const removeFromCartAction = actionCreator<RemoveFromCartPayloadType>(
  CartActionNames.REMOVE_FROM_CART
);

export const initializeCartAction = actionCreator<InitializeCartPayloadType>(
  CartActionNames.INITIALIZE_CART
);

export const clearCartAction = actionCreator(CartActionNames.CLEAR_CART);
