import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      name
      subCategory {
        id
        name
        typeClothes {
          id
          name
        }
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      id
      name
      subCategory {
        id
        name
      }
    }
  }
`;

export const ADD_SUB_CATEGORY = gql`
  mutation AddSubCategory($idCategory: String!, $nameSubCategory: String!) {
    addSubCategory(idCategory: $idCategory, nameSubCategory: $nameSubCategory) {
      id
      name
      subCategory {
        name
        id
      }
    }
  }
`;

export const ADD_THING_TO_SUB_CATEGORY = gql`
  mutation AddThingToSubCategory(
    $idCategory: String!
    $idSubCategory: String!
    $nameThing: String!
  ) {
    addThingToSubCategory(
      idCategory: $idCategory
      idSubCategory: $idSubCategory
      nameThing: $nameThing
    ) {
      id
      name
      subCategory {
        name
        id
        typeClothes {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($idCategory: String!) {
    deleteCategory(idCategory: $idCategory) {
      id
      name
    }
  }
`;

export const DELETE_SUB_CATEGORY = gql`
  mutation DeleteSubCategory($idCategory: String!, $idSubCategory: String!) {
    deleteSubCategory(idCategory: $idCategory, idSubCategory: $idSubCategory) {
      id
      name
      subCategory {
        id
        name
        typeClothes {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_THING_FROM_SUB_CATEGORY = gql`
  mutation DeleteThingFromSubCategory(
    $idCategory: String!
    $idSubCategory: String!
    $idClotheType: String!
  ) {
    deleteThingFromSubCategory(
      idCategory: $idCategory
      idSubCategory: $idSubCategory
      idClotheType: $idClotheType
    ) {
      id
      name
      subCategory {
        id
        name
        typeClothes {
          id
          name
        }
      }
    }
  }
`;
