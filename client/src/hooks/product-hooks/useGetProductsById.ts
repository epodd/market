import { useEffect, useState } from "react";
import { GetProductByIdsQuery, useGetProductByIdsLazyQuery } from "src/api";

export type ProductsType = GetProductByIdsQuery["getProductByIds"];

export const useGetProductByIdsHook = (
  ids?: string[]
): { products: ProductsType } => {
  const [getProductByIds] = useGetProductByIdsLazyQuery();
  const [products, setProducts] = useState<ProductsType | []>([]);
  useEffect(() => {
    if (ids) {
      if (!ids.length) {
        setProducts([]);
        return;
      }
      getProductByIds({
        variables: { ids },
        fetchPolicy: "cache-first",
        onCompleted: (data) => {
          setProducts(data.getProductByIds);
        },
      });
    }
  }, [ids]);

  return { products };
};
