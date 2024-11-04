import React, { memo, useCallback, useEffect, useState } from "react";
import { Box, Text } from "src/UI-kit";
import { FilterLabel } from "src/components";
import { FilterArrayItem, FilterItem, IFilter } from "src/types";
import { findArrayInObject } from "src/utils";

type FilterProps = {
  onChange?: (values: FilterArrayItem) => void;
  values: FilterArrayItem;
  title: string;
  filterValue: IFilter;
  name: string;
};

export const Filter = ({
  name,
  filterValue,
  values,
  title,
  onChange,
}: FilterProps) => {
  const [items, setItems] = useState<FilterArrayItem>([]);
  const [selects, setSelects] = useState<FilterArrayItem>([]);
  const [valuesHasDeep, setValuesHasDeep] = useState<boolean>(false);
  const [send, setSend] = useState<number>(0);

  useEffect(() => {
    if (!values) return;
    const valuesHasDeep = values.find((el) => findArrayInObject(el).length);
    setValuesHasDeep(!!valuesHasDeep);
    setItems(values);
  }, [values]);

  useEffect(() => {
    const filter = filterValue[name as keyof typeof filterValue];
    setSelects(filter);
  }, [filterValue]);

  useEffect(() => {
    if (selects && selects.length) {
      if (valuesHasDeep) {
        let arr = [...values];

        selects.forEach((el: any) => {
          const hasItem = arr.find((findEl) => findEl.id == el.id);
          arr = findArrayInObject(hasItem);
        });

        setItems(arr || []);
      }
    } else {
      setItems(values || []);
    }
  }, [selects]);

  useEffect(() => {
    if (!send) return;

    const formattedSelects = selects.map((el) => {
      return Object.keys(el).reduce((acc: any, key: string) => {
        if (!Array.isArray(el[key as keyof typeof el])) {
          acc[key] = el[key as keyof typeof el];
        }

        return acc;
      }, {});
    });

    onChange && onChange(formattedSelects);
  }, [send]);

  const handleSelect = (value: FilterItem) => {
    const hasItem = selects.find((el: FilterItem) => el.id === value.id);
    if (!hasItem) {
      setSelects((prev: FilterArrayItem) => {
        return [
          ...prev,
          valuesHasDeep ? { ...value, order: String(selects.length) } : value,
        ];
      });
      setSend(selects.length + 1);
    }
  };

  const handleDelete = (id: string) => {
    const findIndex = selects.findIndex((el: FilterItem) => el.id === id);

    if (findIndex >= 0 && valuesHasDeep) {
      setSelects((prev: FilterArrayItem) => prev.slice(0, findIndex));
      setSend(selects.length + 1);
    }

    if (!valuesHasDeep) {
      setSelects((prev: FilterArrayItem) =>
        prev.filter((el: FilterItem) => el.id !== id)
      );
      setSend(selects.length + 1);
    }
  };

  const selectIds = selects.map((el: FilterItem) => el.id);
  return (
    <Box behavior="column">
      <Box behavior="rowBetweenAlign" m="0 0 10px 0">
        <Text variant="small">{title}</Text>
        <Text variant="small">{`[${selects.length}/${
          selects.length +
          items.filter((el: any) => !selectIds.includes(el.id)).length
        }]`}</Text>
      </Box>
      <Box fw="wrap" behavior="rowAlignCenter">
        {selects
          ? selects.map((el: FilterItem) => {
              return (
                <FilterLabel
                  active
                  key={el.id}
                  labelItem={el}
                  onSelect={handleSelect}
                  onDelete={handleDelete}
                />
              );
            })
          : null}
        {items
          ? items.map((el: FilterItem) => {
              if (selectIds.includes(el.id)) return;
              return (
                <FilterLabel
                  key={el.id}
                  labelItem={el}
                  onSelect={handleSelect}
                  onDelete={handleDelete}
                />
              );
            })
          : null}
      </Box>
    </Box>
  );
};
