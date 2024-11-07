import { GraphQLString, GraphQLObjectType, GraphQLList } from "graphql";
import categoryService from "../../services/category/category-service";
import { gql } from 'apollo-server-express'



export const categoriesTypeDefs = gql`
    
    type ClothesType {
      name: String!,
      id: String!
      createAt: String!
    }
    
    
    type SubCategoryType {
      name: String!
      id: String!,
      typeClothes: [ClothesType!]
      createAt:String!,
    }
    
    type Category {
      name: String!
      id: String!
      subCategory: [SubCategoryType]!
      createAt: String!
    }
    

    type Query {
        getCategory(idCategory: String!): Category!
        getCategories: [Category]
    }

    type Mutation {
        addCategory(name: String!): Category! ,
        addSubCategory(idCategory: String!, nameSubCategory: String!): Category!
        addThingToSubCategory(idCategory: String!, idSubCategory: String!, nameThing:String!): Category!
        deleteCategory(idCategory: String!): Category!
        deleteSubCategory(idCategory: String!, idSubCategory: String!): Category!
        deleteThingFromSubCategory(idCategory: String!, idSubCategory: String!, idClotheType:String!): Category!
    }
`;


export const CategoriesQueries = {
  getCategories: categoryService.getCategories,
  getCategory: categoryService.getCategory,
};

export const CategoriesMutations = {
  addCategory: categoryService.addCategory,
  addSubCategory: categoryService.addSubCategory,
  addThingToSubCategory: categoryService.addThingToSubCategory,
  deleteCategory: categoryService.deleteCategory,
  deleteSubCategory: categoryService.deleteSubCategory,
  deleteThingFromSubCategory: categoryService.deleteThingFromSubCategory,
};

// export const CategoryQueries = {
//   getCategories: {
//     type: new GraphQLList(CategoryType),
//     args: {},
//     resolve: categoryService.getCategories,
//   },
//   getCategory: {
//     type: CategoryType,
//     args: { idCategory: { type: GraphQLString } },
//     resolve: categoryService.getCategory,
//   },
// };
//
// export const CategoryMutations = {
//   addCategory: {
//     type: CategoryType,
//     args: {
//       name: {
//         type: GraphQLString,
//       },
//     },
//     resolve: categoryService.addCategory,
//   },
//   addSubCategory: {
//     type: CategoryType,
//     args: {
//       idCategory: {
//         type: GraphQLString,
//       },
//       nameSubCategory: {
//         type: GraphQLString,
//       },
//     },
//     resolve: categoryService.addSubCategory,
//   },
//   addThingToSubCategory: {
//     type: CategoryType,
//     args: {
//       idCategory: {
//         type: GraphQLString,
//       },
//       idSubCategory: {
//         type: GraphQLString,
//       },
//       nameThing: {
//         type: GraphQLString,
//       },
//     },
//     resolve: categoryService.addThingToSubCategory,
//   },
//   deleteCategory: {
//     type: CategoryType,
//     args: {
//       idCategory: {
//         type: GraphQLString,
//       },
//     },
//     resolve: categoryService.deleteCategory,
//   },
//   deleteSubCategory: {
//     type: CategoryType,
//     args: {
//       idCategory: {
//         type: GraphQLString,
//       },
//       idSubCategory: {
//         type: GraphQLString,
//       },
//     },
//     resolve: categoryService.deleteSubCategory,
//   },
//   deleteThingFromSubCategory: {
//     type: CategoryType,
//     args: {
//       idCategory: {
//         type: GraphQLString,
//       },
//       idSubCategory: {
//         type: GraphQLString,
//       },
//       idClotheType: {
//         type: GraphQLString,
//       },
//     },
//     resolve: categoryService.deleteThingFromSubCategory,
//   },
// };
