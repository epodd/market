import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "src/UI-kit";
import { ProductCard } from "src/components/cards/product-card/product-card";
import { Spinner } from "src/components";
import { IProductCart } from "src/types";
import { useRouter } from "src/hooks/useRouter";
import { useTheme } from "styled-components";
import { FilterModal } from "src/modals/filter-modal/filter-modal";
import { useAuth, useFilter } from "src/contexts";
import { omit } from "lodash";
import {
  GetProductsQuery,
  GetProductsQueryVariables,
  useGetProductsLazyQuery,
} from "src/api";
import { loadingVar } from "src/store";
import { QueryResult, useApolloClient } from "@apollo/client";
import { ProductType } from "aws-sdk/clients/servicecatalog";

export const ProductsContainer = () => {
  const { filter, setFilter, clearFilter, loading } = useFilter();
  const { user } = useAuth();
  const [getProducts, { loading: getProductsLoading, data }] =
    useGetProductsLazyQuery();
  const products = data?.getProducts || [];
  const { colors } = useTheme();
  const { push } = useRouter();
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  // const [products, setProducts] = useState<GetProductsQuery["getProducts"]>([]);
  const [countFilters, setCountFilter] = useState<number>(0);

  useEffect(() => {
    const filters =
      filter.categories.length || filter.colors.length
        ? {
            filter: {
              categoryId: filter.categories.at(-1)?.id || "",
              colors: filter.colors,
            },
          }
        : {};

    loadingVar(true);
    getProducts({
      variables: filters,
    }).finally(() => {
      loadingVar(false);
    });
  }, [filter]);

  useEffect(() => {
    if (filter) {
      const count = Object.values(omit(filter, "__typename")).reduce(
        (acc: any, el: any) => {
          if (el.length) {
            acc = acc + el.length;
          }
          return acc;
        },
        0
      );
      setCountFilter(Number(count));
    }
  }, [filter]);

  const handleOpenProduct = (id: string) => {
    push(`product/${id}`);
  };

  return (
    <Box behavior="column">
      <FilterModal
        loading={loading || getProductsLoading}
        userId={user?.id}
        filter={filter}
        setFilter={setFilter}
        clearFilter={clearFilter}
        setOpen={setOpenFilterModal}
        open={openFilterModal}
      />
      <Box m="20px 0 20px 0" behavior="rowBetweenAlign">
        <Button
          w="fit-content"
          h="fit-content"
          p="8px 13px"
          color={colors.gray_light}
          onClick={() => setOpenFilterModal(!openFilterModal)}
        >
          <Text color="black" cursor="pointer" variant="small">
            {`FILTERS ${countFilters ? `[${countFilters}]` : ""}`}
          </Text>
        </Button>
        <Text variant="small">{`[${products.length}]`}</Text>
      </Box>
      <Box w="100%" behavior="row" fw="wrap">
        {products.map((el: IProductCart, i: number) => {
          return (
            <ProductCard onClick={handleOpenProduct} key={i} productItem={el} />
          );
        })}
        {!products?.length && (
          <Text w="100%" textAlign="center" variant="small">
            Product list is empty
          </Text>
        )}
      </Box>
    </Box>
  );
};
