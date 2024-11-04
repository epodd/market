export enum CategoryTypes {
  category = "category",
  subCategory = "subCategory",
  thing = "thing",
  default = "",
}

export type ActiveCategoryType = { [key: string]: string };

export type CreateActionType = {
  typeRequest?: string;
  idCategory?: string;
  idSubCategory?: string;
  name?: string;
};

export type ActionArgumentsType = {
  idCategory?: string;
  idSubCategory?: string;
  idClotheType?: string | null;
};
