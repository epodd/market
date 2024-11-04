import { ICategory, IFilter } from "../../types";
import { Dispatch } from "react";

export type StoreStateType = {
  categories: ICategory[];
  activeCategory: ICategory | null;
};

export enum StoreActions {
  SET_CATEGORIES,
  SET_ACTIVE_CATEGORY,
}

export type StoreContextType = {
  dispatch: Dispatch<StoreActionTypes>;
  categories: ICategory[];
  activeCategory: ICategory | null;
  setActiveCategory: (category: ICategory | null) => void;
};

export type SetCategoriesType = {
  categories: ICategory[];
};

export type SetActiveCategoryType = {
  activeCategory: ICategory | null;
};

export type StoreActionTypes =
  | {
      type: StoreActions.SET_CATEGORIES;
      payload: SetCategoriesType;
    }
  | {
      type: StoreActions.SET_ACTIVE_CATEGORY;
      payload: SetActiveCategoryType;
    };
