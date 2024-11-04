import { StoreActions, StoreActionTypes, StoreStateType } from "./types";

export const initialState: StoreStateType = {
  categories: [],
  activeCategory: null,
};

export const StoreReducer = (
  state: StoreStateType,
  action: StoreActionTypes
) => {
  switch (action.type) {
    case StoreActions.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
      };
    case StoreActions.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload.activeCategory,
      };

    default:
      return state;
  }
};
