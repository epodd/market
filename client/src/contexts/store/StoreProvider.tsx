import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { StoreReducer, initialState } from "./reducer";
import { StoreContextType } from "./types";
import { useCategoriesHook } from "../../hooks/useCategories";
import { setActiveCategoryAction, setCategoriesAction } from "./actions";
import { ICategory } from "../../types";

const StoreContext = createContext<StoreContextType | null>(null);

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(StoreReducer, initialState);
  const { allCategories } = useCategoriesHook();

  const handlers = useMemo(
    () => ({
      setActiveCategory: (category: ICategory | null) => {
        dispatch(setActiveCategoryAction({ activeCategory: category }));
      },
    }),
    [dispatch]
  );

  useEffect(() => {
    dispatch(setCategoriesAction({ categories: allCategories }));
  }, [allCategories]);

  const contextValue = useMemo(() => {
    return {
      ...state,
      dispatch,
      ...handlers,
    };
  }, [state, handlers]);

  return (
    <div>
      <StoreContext.Provider value={contextValue}>
        {children}
      </StoreContext.Provider>
    </div>
  );
};

export { StoreContext, StoreProvider };
