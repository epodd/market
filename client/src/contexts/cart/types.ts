import { ICategory, IProduct } from "src/types";

export enum CartActionNames {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INITIALIZE_CART,
  CLEAR_CART,
}

export interface ICartState {
  products: IProduct[];
}

export interface ICartContext {
  products: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
}

export type AddCartPayloadType = {
  product: IProduct;
};

export type RemoveFromCartPayloadType = {
  id: string;
};

export type InitializeCartPayloadType = {
  products: IProduct[];
};

export type CartActionTypes =
  | {
      type: CartActionNames.ADD_TO_CART;
      payload: AddCartPayloadType;
    }
  | {
      type: CartActionNames.REMOVE_FROM_CART;
      payload: RemoveFromCartPayloadType;
    }
  | {
      type: CartActionNames.INITIALIZE_CART;
      payload: InitializeCartPayloadType;
    }
  | {
      type: CartActionNames.CLEAR_CART;
    };
