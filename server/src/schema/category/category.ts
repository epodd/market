import { GraphQLString, GraphQLObjectType, GraphQLList } from "graphql";
import categoryService from "../../services/category/category-service";

const ClothesType = new GraphQLObjectType({
  name: "ThingsType",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLString },
    createAt: { type: GraphQLString },
  }),
});

const SubCategoryType = new GraphQLObjectType({
  name: "SubCategoryType",
  fields: () => ({
    name: { type: GraphQLString, unique: true },
    id: { type: GraphQLString, unique: true },
    typeClothes: { type: new GraphQLList(ClothesType) },
    createAt: { type: GraphQLString },
  }),
});

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLString },
    subCategory: { type: new GraphQLList(SubCategoryType) },
    createAt: { type: GraphQLString },
  }),
});

export const CategoryQueries = {
  getCategories: {
    type: new GraphQLList(CategoryType),
    args: {},
    resolve: categoryService.getCategories,
  },
  getCategory: {
    type: CategoryType,
    args: { idCategory: { type: GraphQLString } },
    resolve: categoryService.getCategory,
  },
};

export const CategoryMutations = {
  addCategory: {
    type: CategoryType,
    args: {
      name: {
        type: GraphQLString,
      },
    },
    resolve: categoryService.addCategory,
  },
  addSubCategory: {
    type: CategoryType,
    args: {
      idCategory: {
        type: GraphQLString,
      },
      nameSubCategory: {
        type: GraphQLString,
      },
    },
    resolve: categoryService.addSubCategory,
  },
  addThingToSubCategory: {
    type: CategoryType,
    args: {
      idCategory: {
        type: GraphQLString,
      },
      idSubCategory: {
        type: GraphQLString,
      },
      nameThing: {
        type: GraphQLString,
      },
    },
    resolve: categoryService.addThingToSubCategory,
  },
  deleteCategory: {
    type: CategoryType,
    args: {
      idCategory: {
        type: GraphQLString,
      },
    },
    resolve: categoryService.deleteCategory,
  },
  deleteSubCategory: {
    type: CategoryType,
    args: {
      idCategory: {
        type: GraphQLString,
      },
      idSubCategory: {
        type: GraphQLString,
      },
    },
    resolve: categoryService.deleteSubCategory,
  },
  deleteThingFromSubCategory: {
    type: CategoryType,
    args: {
      idCategory: {
        type: GraphQLString,
      },
      idSubCategory: {
        type: GraphQLString,
      },
      idClotheType: {
        type: GraphQLString,
      },
    },
    resolve: categoryService.deleteThingFromSubCategory,
  },
};
