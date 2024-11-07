import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "src/UI-kit";
import {
  useAddCategory,
  useGetCategories,
  useDeleteCategory,
  useAddSubCategory,
  useDeleteSubCategory,
  useAddThingTOSubCategory,
  useDeleteThingFromSubCategory,
} from "src/api";
import styled from "styled-components";
import { useSnackbars } from "src/hooks/useSnackbar";
import _ from "lodash";
import {
  ActionArgumentsType,
  ActiveCategoryType,
  CategoryTypes,
  CreateActionType,
} from "./types";
import { LabelsContainer } from "./label-category/label-category-component";
import { ICategory, ISubCategory, ITypeClothes } from "src/types";
import { GET_CATEGORIES } from "src/api/category/schema";
import { useApolloClient } from '@apollo/client'

const Wrapper = styled.div`
  width: 100%;
  padding: 50px 100px;
`;

const emptyCategory = { id: "", name: "" };

export const deepIDNames = {
  0: "idCategory",
  1: "idSubCategory",
  2: "idClotheType",
};

const CategoryContainer = () => {
  const [getCategories] = useGetCategories();
  const [addCategory] = useAddCategory();
  const [addSubCategory] = useAddSubCategory();
  const [addThingToSubCategory] = useAddThingTOSubCategory();
  const [deleteCategory] = useDeleteCategory();
  const [deleteSubCategory] = useDeleteSubCategory();
  const [deleteThingFromSubCategory] = useDeleteThingFromSubCategory();
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbars();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState<ActiveCategoryType>(emptyCategory);
  const [subActiveCategory, setActiveSubCategory] =
    useState<ActiveCategoryType>(emptyCategory);
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [typeClothes, setTypeClothes] = useState<ITypeClothes[]>([]);
  const [createType, setCreateType] = useState<keyof typeof CategoryTypes | "">(
    ""
  );
  const data = useApolloClient()
  const cacheCategories = data?.readQuery({query: GET_CATEGORIES})
  
  
  useEffect(() => {
    if (!cacheCategories?.getCategories?.length) return
    setCategories(cacheCategories.getCategories)
  }, [data, cacheCategories?.getCategories])
  
  const handleCreate = ({
    idCategory,
    idSubCategory,
    name,
    typeRequest,
  }: CreateActionType) => {
    if (typeRequest === CategoryTypes["category"]) {
      addCategory({
        variables: {
          name,
        },
        onCompleted: (data) => {
          setCreateType("");
          showSuccessSnackbar(`Category '${name}' has been added`);
        },
        onError: (error) => showErrorSnackbar(`Something went wrong! ${error}`),
        update(cache, { data: {addCategory}}) {
          const existingData: any = cache.readQuery({ query: GET_CATEGORIES });
          const newData = [...existingData?.getCategories,addCategory]

          cache.writeQuery({
            query: GET_CATEGORIES,
            data: { getCategories: newData},
          });
        },
      });
      return;
    }

    if (typeRequest === CategoryTypes["subCategory"]) {
      addSubCategory({
        variables: {
          idCategory,
          nameSubCategory: name,
        },
        onCompleted: (data) => {
          setCreateType("");
          setSubCategories(data?.addSubCategory?.subCategory);
          showSuccessSnackbar("Category added");
        },
        onError: (error) => showErrorSnackbar(`Something went wrong! ${error}`),
      });
      return;
    }

    if (typeRequest === CategoryTypes["thing"]) {
      addThingToSubCategory({
        variables: {
          idCategory,
          idSubCategory,
          nameThing: name,
        },
        onCompleted: () => {
          setCreateType("");
          showSuccessSnackbar("Category added");
        },
        onError: (error) => showErrorSnackbar(`Something went wrong! ${error}`),
        // update(cache, { data }) {
        //   let { getCategories }: any = cache.readQuery({
        //     query: GET_CATEGORIES,
        //   });
        //
        //   const mutationArray = _.cloneDeep(getCategories);
        //
        //   setCategories(
        //     mutationArray.map((el: any) => {
        //       if (el.id === idCategory) {
        //         return data.addThingToSubCategory;
        //       }
        //       return el;
        //     })
        //   );
        // },
      });
      return;
    }
  };

  const handleDeleteCategory = ({ idCategory, name }: ActionArgumentsType) => {
    deleteCategory({
      variables: {
        idCategory,
      },
      onCompleted: () => {
        showSuccessSnackbar(`Category '${name}' success deleted!`);
      },
      onError: (error) => showErrorSnackbar(`Something went wrong! ${error}`),
      update(cache, { data }) {
        const normalizeId = cache.identify(data.deleteCategory);
        cache.evict({ id: normalizeId });
        cache.gc();
      },
    });
  };

  const handleDeleteSubCategory = ({
    idCategory,
    idSubCategory,
    name,
  }: ActionArgumentsType) => {
    deleteSubCategory({
      variables: {
        idCategory,
        idSubCategory,
      },
      onCompleted: () => {
        setActiveSubCategory({ id: "", name: "" });
        showSuccessSnackbar(`Category '${name}' success deleted!`);
      },
      onError: (error) => showErrorSnackbar(`Something went wrong! ${error}`),
      update(cache, { data }) {
        const cashData = cache.readQuery({
          query: GET_CATEGORIES,
          variables: { idCategory, idSubCategory },
        });

        cache.writeQuery({ query: GET_CATEGORIES, data: cashData });
      },
    });
  };

  const handleDeleteThingFromSubCategory = ({
    idCategory,
    idSubCategory,
    idClotheType,
    name
  }: ActionArgumentsType) => {
    deleteThingFromSubCategory({
      variables: {
        idCategory,
        idSubCategory,
        idClotheType,
      },
      
      onCompleted: () => {
        showSuccessSnackbar(`Thing '${name}' success deleted from sub category!`);
      },
      onError: (error) => showErrorSnackbar(`Something went wrong! ${error}`),
      update(cache, { data }) {
        const cashData = cache.readQuery({
          query: GET_CATEGORIES,
          variables: { idCategory, idSubCategory, idClotheType },
        });

        cache.writeQuery({ query: GET_CATEGORIES, data: cashData });
      },
    });
  };

  useEffect(() => {
    getCategories({
      onCompleted: (data) => {
        setCategories(data?.getCategories);
      },
    });
  }, [getCategories]);
  
  

  useEffect(() => {
    if (!category.id) return;

    setSubCategories(
      categories?.find((el: ICategory) => el.id === category?.id)
        ?.subCategory || []
    );
  }, [category, categories]);

  useEffect(() => {
    if (!subActiveCategory.id) return;

    setTypeClothes(
      subCategories?.find((el: any) => el.id === subActiveCategory.id)
        ?.typeClothes || []
    );
  }, [subActiveCategory, subCategories]);

  useEffect(() => {
    if (createType) {
      setCreateType("");
    }
  }, [category, subActiveCategory, typeClothes]);

  const handleSetCategory = (data: ActiveCategoryType) => {
    setActiveSubCategory(emptyCategory);
    setCategory(data);
  };

  const actionArguments = useMemo(() => {
    return {
      [deepIDNames[0]]: category.id,
      [deepIDNames[1]]: subActiveCategory.id,
      [deepIDNames[2]]: null,
    };
  }, [category, subActiveCategory]);

  return (
    <Wrapper>
      <Box behavior="column">
        <LabelsContainer
          deepIndex={0}
          title="All categories:"
          actionArguments={actionArguments}
          labelsType={CategoryTypes["category"]}
          createAction={handleCreate}
          deleteAction={handleDeleteCategory}
          setActiveItem={handleSetCategory}
          activeItem={category}
          setCreateType={setCreateType}
          createType={createType}
          labelItems={categories}
        />
        {category.id ? (
          <LabelsContainer
            deepIndex={1}
            title={`${category.name} sub categories:`}
            actionArguments={actionArguments}
            labelsType={CategoryTypes["subCategory"]}
            createAction={handleCreate}
            deleteAction={handleDeleteSubCategory}
            setActiveItem={setActiveSubCategory}
            activeItem={subActiveCategory}
            setCreateType={setCreateType}
            createType={createType}
            labelItems={subCategories}
          />
        ) : null}
        {category.id && subActiveCategory.id && (
          <LabelsContainer
            deepIndex={2}
            title={`${subActiveCategory.name} typeClothes type:`}
            actionArguments={{
              idCategory: category.id,
              idSubCategory: subActiveCategory.id,
            }}
            labelsType={CategoryTypes["thing"]}
            createAction={handleCreate}
            deleteAction={handleDeleteThingFromSubCategory}
            activeItem={subActiveCategory}
            setCreateType={setCreateType}
            createType={createType}
            labelItems={typeClothes}
          />
        )}
      </Box>
    </Wrapper>
  );
};

export default CategoryContainer;
