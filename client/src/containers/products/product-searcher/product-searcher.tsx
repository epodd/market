import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Dropdown } from "src/components/dropdown/dropdown";
import _ from "lodash";
import { Box, CheckboxComponent, Image, Text } from "src/UI-kit";
import { useFormState } from "react-final-form";
import { IProductByName } from "src/types";
import { useGetProductByNameHook } from "../../../hooks/product-hooks/useGetProductByName";

type ProductSearcherItemType = {
  color: string;
  id: string;
};

export const ProductSearcher = ({
  name: nameField,
  onChange,
}: {
  name: string;
  onChange: any;
}) => {
  const { values } = useFormState();
  const [searchString, setSearchString] = useState<string>("");
  const { products } = useGetProductByNameHook(
    useMemo(() => searchString, [searchString])
  );

  const handleSearch = _.debounce((value: string) => {
    setSearchString(value);
  }, 400);

  useEffect(() => {}, []);

  const handleChange = (value: ProductSearcherItemType) => {
    let mutation = values[nameField] ? [...values[nameField]] : [];
    const hasItem = mutation.find(
      (el: ProductSearcherItemType) => el.id === value.id
    );
    if (hasItem) {
      mutation = mutation.filter(
        (el: ProductSearcherItemType) => el.id !== value.id
      );
    } else {
      mutation.push(value);
    }

    onChange && onChange(nameField, mutation);
  };

  return (
    <Box>
      <Dropdown
        search={handleSearch}
        placeholder="Select product to link"
        searchPlaceholder={"Enter product name"}
        bodyContent={
          products && products.length ? (
            <Box behavior="column" p="10px 20px">
              {products.map(({ id, name, images, color }: IProductByName) => {
                return (
                  <Box m="0 0 10px 0" key={id} behavior="rowBetweenAlign">
                    <Box behavior="rowAlignCenter">
                      <Image src={images[0].location} w="50px" h="50px" />
                      <Text m="0 0 0 10px">{name}</Text>
                    </Box>
                    <CheckboxComponent
                      name={name}
                      type="checkbox"
                      checked={
                        !!values[nameField]?.find(
                          (el: ProductSearcherItemType) => el.id === id
                        )
                      }
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange({ id, color })
                      }
                    />
                  </Box>
                );
              })}
            </Box>
          ) : null
        }
      />
    </Box>
  );
};
