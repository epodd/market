import { useEffect, useState } from "react";
import { GetProductByIdsQuery, useGetProductByIdsLazyQuery } from "src/api";
import { QueryResult } from "@apollo/client";
import { ProductType } from "aws-sdk/clients/servicecatalog";

export type ProductsType = GetProductByIdsQuery["getProductByIds"];

export const useGetProductByIdsHook = (
  ids?: string[]
): { products?: ProductsType } => {
  const [getProductByIds, { data }] = useGetProductByIdsLazyQuery();

  useEffect(() => {
    if (ids) {
      getProductByIds({
        variables: { ids },
        fetchPolicy: "cache-first",
      });
    }
  }, [ids]);

  return { products: data?.getProductByIds };
};
