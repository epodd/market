import {
  ActionArgumentsType,
  ActiveCategoryType,
  CategoryTypes,
  CreateActionType,
} from "../types";
import { ICategory, ISubCategory, ITypeClothes } from "src/types";

export type LabelsContainerType = {
  createType: keyof typeof CategoryTypes | "";
  labelsType: keyof typeof CategoryTypes;
  labelItems: ICategory[] | ISubCategory[] | ITypeClothes[];
  activeItem: ActiveCategoryType;
  setActiveItem?: (arg: ActiveCategoryType) => void;
  deleteAction: (arg: ActionArgumentsType) => void;
  createAction: (arg: CreateActionType) => void;
  actionArguments?: ActionArgumentsType;
  setCreateType: (type: keyof typeof CategoryTypes | "") => void;
  deepIndex?: number;
  title: string;
};

export type LabelType = {
  activeItem: ActiveCategoryType;
  deepIndex?: number;
  id: string;
  setActiveItem?: (arg: ActiveCategoryType) => void;
  name: string;
  deleteAction: (arg: ActionArgumentsType) => void;
  actionArguments?: ActionArgumentsType;
};
