import { ICategory, IFilter } from "../../types";
import { Dispatch } from "react";

export type FilterStateType = {
  filter: IFilter;
  filterLoaded: boolean;
  loading: boolean;
};

export enum FilterActions {
  SET_FILTER,
  GET_FILTER,
  CLEAR_FILTER,
  SET_LOADING,
}

export type FilterContextType = {
  dispatch: Dispatch<FilterActionTypes>;
  filter: IFilter;
  loading: boolean;
  filterLoaded: boolean;
  setFilter: (filter: IFilter) => void;
  clearFilter: () => void;
};

export type GetFilterType = {
  filter: IFilter;
  filterLoaded?: boolean;
};

export type SetFilterType = {
  filter: IFilter;
};

export type SetLoadingType = {
  loading: boolean;
};

export type ClearFilterType = {
  filter: IFilter;
};

export type FilterActionTypes =
  | { type: FilterActions.SET_FILTER; payload: SetFilterType }
  | { type: FilterActions.GET_FILTER; payload: GetFilterType }
  | { type: FilterActions.SET_LOADING; payload: SetLoadingType }
  | { type: FilterActions.CLEAR_FILTER; payload: ClearFilterType };
