import { actionCreator } from "../utils";
import {
  SetActiveCategoryType,
  SetCategoriesType,
  StoreActions,
} from "./types";

export const setCategoriesAction = actionCreator<SetCategoriesType>(
  StoreActions.SET_CATEGORIES
);

export const setActiveCategoryAction = actionCreator<SetActiveCategoryType>(
  StoreActions.SET_ACTIVE_CATEGORY
);
