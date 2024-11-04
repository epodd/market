import { useEffect, useMemo, useState } from "react";
import { ICategory, ISubCategory, ITypeClothes } from "src/types";
import { useGetCategories } from "src/api";

export const useCategoriesHook = (id?: string) => {
  const [getCategories] = useGetCategories();

  const [allTypeClothes, setAllTypeClothes] = useState<ITypeClothes[]>([]);
  const [allSubCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);
  const [allTypeClothesWithParentIds, setAllTypeClothesWithParentIds] =
    useState<any>([]);

  useEffect(() => {
    getCategories({
      onCompleted: (data) => {
        const allSubCategories = data.getCategories
          .map((el: any) => el.subCategory)
          .flat();

        const allTypeClothesWithParentIds = data.getCategories
          .map((el: any) => {
            let categoryId = el.id;
            return el.subCategory.map((subEl: any) => {
              let subCategoryId = subEl.id;
              return subEl.typeClothes.map((typeEl: any) => {
                return {
                  categoryId,
                  subCategoryId,
                  id: typeEl.id,
                  name: typeEl.name,
                };
              });
            });
          })
          .flat(3);

        const allTypeClothes = allSubCategories
          .map((el: any) => el.typeClothes)
          .flat();

        setAllTypeClothesWithParentIds(allTypeClothesWithParentIds);
        setAllCategories(data.getCategories);
        setSubCategories(allSubCategories);
        setAllTypeClothes(allTypeClothes);
      },
    });
  }, []);

  return {
    allTypeClothes,
    allSubCategories,
    allCategories,
    allTypeClothesWithParentIds,
  };
};
