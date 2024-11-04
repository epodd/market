import { actionCreator } from "../utils";
import {
  ClearFilterType,
  FilterActions,
  GetFilterType,
  SetFilterType,
  SetLoadingType,
} from "./types";

export const getFilterAction = actionCreator<GetFilterType>(
  FilterActions.GET_FILTER
);
export const setLoadingAction = actionCreator<SetLoadingType>(
  FilterActions.SET_LOADING
);
export const setFilterAction = actionCreator<SetFilterType>(
  FilterActions.SET_FILTER
);
export const clearFilterAction = actionCreator<ClearFilterType>(
  FilterActions.CLEAR_FILTER
);
