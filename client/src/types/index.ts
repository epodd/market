import { GetProductByIdsQuery, GetProductsQuery } from "../api";

export interface ICategory {
  id: string;
  name: string;
  subCategory: ISubCategory[];
}

export interface ITypeClothes {
  id: string;
  name: string;
}

export interface ISubCategory {
  id: string;
  name: string;
  typeClothes: ITypeClothes[];
}

// type Unpacked<T> = T extends (infer U)[]
//   ? U
//   : T extends (...args: any[]) => infer U
//   ? U
//   : T extends Promise<infer U>
//   ? U
//   : T;

type UnwrapArray<T> = T extends Array<infer R> ? R : never;

export type IProduct = UnwrapArray<
  Omit<GetProductByIdsQuery["getProductByIds"], "__typename">
>;

export type IProductCart = Pick<IProduct, "name" | "id" | "price" | "images">;

export type IProductByName = Pick<IProduct, "name" | "id" | "color" | "images">;

export interface IColor {
  name: string;
  color: string;
  id: string;
}

export interface ICategoriesFilter {
  id: string;
  name: string;
  order: string;
}

export interface IColorFilter {
  id: string;
  name: string;
  color: string;
}

export interface IFilter {
  categories: ICategoriesFilter[];
  colors: IColorFilter[];
}

export type FilterArrayItem = ICategory[] | IColor[] | ITypeClothes[] | [];
export type FilterItem = IColor | ICategory | ITypeClothes;
