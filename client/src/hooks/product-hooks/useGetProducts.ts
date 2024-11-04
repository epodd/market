import { useEffect, useState } from "react";
import {
  FilterInputType,
  GetProductsQuery,
  useGetProductsLazyQuery,
} from "src/api";

export type ProductsType = GetProductsQuery["getProducts"];

export const useProductsHook = <T>(
  filter?: FilterInputType
): { products: ProductsType } => {
  const [getProducts] = useGetProductsLazyQuery();
  const [products, setProducts] = useState<ProductsType | []>([]);

  useEffect(() => {
    if (filter) {
      const hasFilter = filter || null;
      getProducts({
        variables: {
          filter: hasFilter,
        },
        onCompleted: (data) => {
          setProducts(data.getProducts);
        },
      });
    }
  }, [filter]);

  return { products };
};
