import { FilterActions, FilterActionTypes, FilterStateType } from "./types";

export const emptyFilter = {
  categories: [],
  colors: [],
};

export const initialState: FilterStateType = {
  filter: emptyFilter,
  filterLoaded: false,
  loading: false,
};

export const FilterReducer = (
  state: FilterStateType,
  action: FilterActionTypes
) => {
  switch (action.type) {
    case FilterActions.GET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
        filterLoaded: true,
      };
    case FilterActions.SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      };
    case FilterActions.CLEAR_FILTER:
      return {
        ...state,
        filter: emptyFilter,
      };
    case FilterActions.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
};
