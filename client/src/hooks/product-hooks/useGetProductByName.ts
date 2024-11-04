import { useEffect, useState } from "react";
import { GetProductByNameQuery, useGetProductByNameLazyQuery } from "src/api";

export type ProductsType = GetProductByNameQuery["getProductByName"];

export const useGetProductByNameHook = (
  name?: string
): { products: ProductsType } => {
  const [getProductByName] = useGetProductByNameLazyQuery();
  const [products, setProducts] = useState<ProductsType | []>([]);

  useEffect(() => {
    if (name) {
      if (name === "" && products.length) {
        setProducts([]);
        return;
      }
      getProductByName({
        variables: { name },
        fetchPolicy: "cache-first",
        onCompleted: (data) => {
          setProducts(data.getProductByName);
        },
      });
    }
  }, [name]);

  return { products };
};
