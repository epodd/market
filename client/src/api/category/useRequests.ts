import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ADD_CATEGORY,
  ADD_SUB_CATEGORY,
  ADD_THING_TO_SUB_CATEGORY,
  DELETE_CATEGORY,
  DELETE_SUB_CATEGORY, DELETE_THING_FROM_SUB_CATEGORY,
  GET_CATEGORIES
} from './schema'

const useGetCategories = () => useLazyQuery(GET_CATEGORIES);
const useAddCategory = () => useMutation(ADD_CATEGORY);
const useAddSubCategory = () => useMutation(ADD_SUB_CATEGORY);
const useAddThingTOSubCategory = () => useMutation(ADD_THING_TO_SUB_CATEGORY);
const useDeleteCategory = () => useMutation(DELETE_CATEGORY);
const useDeleteSubCategory = () => useMutation(DELETE_SUB_CATEGORY);
const useDeleteThingFromSubCategory = () =>
  useMutation(DELETE_THING_FROM_SUB_CATEGORY);

export {
  useGetCategories,
  useAddCategory,
  useDeleteCategory,
  useAddSubCategory,
  useDeleteSubCategory,
  useAddThingTOSubCategory,
  useDeleteThingFromSubCategory,
};
