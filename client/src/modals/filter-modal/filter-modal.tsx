import React from "react";
import { Box, Button, Text } from "src/UI-kit";
import { Filter } from "src/containers/filters/filter/filter";
import { useCategoriesHook } from "src/hooks/useCategories";
import { useGetColors } from "src/api/color/useRequests";
import { FilterArrayItem, IFilter } from "src/types";
import { useTheme } from "styled-components";
import { Modal } from "../../components/modal/modal";

type FilterModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  setFilter: (filter: IFilter) => void;
  clearFilter: () => void;
  filter: IFilter;
  loading?: boolean;
  userId?: string | undefined;
};

export const FilterModal = ({
  filter,
  open,
  setOpen,
  setFilter,
  clearFilter,
  loading,
}: FilterModalProps) => {
  const { allCategories } = useCategoriesHook();
  const { data: dataColors } = useGetColors();
  const { colors } = useTheme();

  const handleSetFilter = async (key: string, value: FilterArrayItem) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  return (
    <Modal
      loading={loading}
      open={open}
      setOpen={setOpen}
      title={"FILTERS"}
      content={
        <>
          <Box behavior="column">
            <Filter
              filterValue={filter}
              name="categories"
              title="Categories:"
              values={allCategories}
              onChange={(values) => handleSetFilter("categories", values)}
            />
            <Filter
              filterValue={filter}
              name="colors"
              title="Colors:"
              values={dataColors?.getColors || []}
              onChange={(values) => handleSetFilter("colors", values)}
            />
          </Box>
          <Button
            m="20px 0 0 0"
            onClick={clearFilter}
            w="fit-content"
            h="fit-content"
            p="5px 15px"
          >
            <Text cursor="pointer" color={colors.white} variant="small">
              CLEAR ALL
            </Text>
          </Button>
        </>
      }
    />
  );
};
