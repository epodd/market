import { CartActionNames, CartActionTypes, ICartState } from "./types";

export const initialState: ICartState = {
  products: [],
};

export const CartReducer = (state: ICartState, action: CartActionTypes) => {
  switch (action.type) {
    case CartActionNames.ADD_TO_CART:
      return {
        ...state,
        products: [...state.products, action.payload.product],
      };
    case CartActionNames.CLEAR_CART:
      return {
        ...state,
        products: [],
      };
    case CartActionNames.REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter((el) => el.id !== action.payload.id),
      };

    case CartActionNames.INITIALIZE_CART:
      return {
        ...state,
        products: action.payload.products,
      };

    default:
      return state;
  }
};
