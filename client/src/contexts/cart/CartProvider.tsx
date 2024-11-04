import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import { ICartContext } from "./types";

import { CartReducer, initialState } from "./reducer";
import { IProduct } from "src/types";
import {
  addToCartAction,
  clearCartAction,
  initializeCartAction,
  removeFromCartAction,
} from "./actions";
import { useUpdateCart, useGetCart } from "src/api/cart/useRequests";
import { useAuth } from "../auth/hooks/use-auth";
import { useProductsHook } from "src/hooks/product-hooks/useGetProducts";
import { useRouter } from "src/hooks/useRouter";
import { SIGN_IN_PATH } from "src/routes/routes-config";
import { useGetProductByIdsHook } from "../../hooks/product-hooks/useGetProductsById";

const CartContext = createContext<ICartContext | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const { user } = useAuth();
  const [productIds, setProductIds] = useState<string[]>([]);
  const [updateCart] = useUpdateCart();
  const { push } = useRouter();
  const [getCart] = useGetCart();
  const { products } = useGetProductByIdsHook(
    useMemo(() => productIds, [productIds])
  );

  useEffect(() => {
    if (user?.id) {
      getCart({
        variables: { userId: user.id },
        onCompleted: ({ getCart }) => {
          setProductIds(getCart.products);
        },
      });
    } else {
      setProductIds([]);
      dispatch(clearCartAction([]));
    }
  }, [user]);

  useEffect(() => {
    if (products?.length) {
      dispatch(initializeCartAction({ products }));
    }
  }, [products]);

  const handlers = useMemo(
    () => ({
      addToCart: async (product: IProduct) => {
        if (user?.id) {
          updateCart({
            variables: {
              userId: user?.id,
              products: [product.id, ...state.products.map((el) => el.id)],
            },
            onCompleted: (data) => {
              dispatch(addToCartAction({ product }));
            },
          });
        } else {
          push(SIGN_IN_PATH);
        }
      },
      removeFromCart: async (id: string) => {
        updateCart({
          variables: {
            userId: user?.id,
            products: state.products
              .map((el) => el.id)
              .filter((el) => el !== id),
          },
          onCompleted: (data) => {
            dispatch(removeFromCartAction({ id }));
          },
        });
      },
    }),
    [dispatch, user, state]
  );

  const contextValue = useMemo(() => {
    return {
      ...state,
      dispatch,
      ...handlers,
    };
  }, [state, handlers]);

  return (
    <div>
      <CartContext.Provider value={contextValue}>
        {children}
      </CartContext.Provider>
    </div>
  );
};

export { CartProvider, CartContext };
