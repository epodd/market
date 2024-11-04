import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Icon } from "src/components/icons/icons";
import { Box, Dropdown, Input, Text } from "src/UI-kit";
import _ from "lodash";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { CheckboxComponent } from "src/UI-kit";
import { useFormState } from "react-final-form";
import { BodyDropdownItem } from "./styled";

type DropdownItemType = { id: string; name: string; [key: string]: string };

export const MultiSelect = ({
  items,
  placeholder,
  name: nameField,
  multiselect,
  onChange,
}: {
  value?: string;
  placeholder?: string;
  multiselect?: boolean;
  normalize?: Function;
  name: string;
  onChange: any;
  items?: DropdownItemType[];
}) => {
  const { values } = useFormState();
  const [dropdownItems, setDropdownItems] = useState<DropdownItemType[]>([]);
  const [searchString, setSearchString] = useState<string>("");

  const handleMultiChange = (value: DropdownItemType) => {
    let mutation = values[nameField] ? [...values[nameField]] : [];
    const hasItem = mutation.find((el: DropdownItemType) => el.id === value.id);
    if (hasItem) {
      mutation = mutation.filter((el: DropdownItemType) => el.id !== value.id);
    } else {
      mutation.push(value);
    }

    onChange && onChange(nameField, mutation);
  };

  const handleSingleChange = (value: DropdownItemType) => {
    onChange && onChange(nameField, value);
  };

  const handleSearch = _.debounce((value: string) => {
    setSearchString(value);
  }, 300);

  useEffect(() => {
    if (!items) return;
    if (searchString) {
      setDropdownItems(
        items.filter(
          (el: DropdownItemType) =>
            el.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1
        )
      );
    } else {
      setDropdownItems(items);
    }
  }, [searchString]);

  useEffect(() => {
    if (items && items.length) {
      setDropdownItems(items);
    }
  }, [items]);

  return (
    <Dropdown
      value={
        values[nameField] && values[nameField].length
          ? values[nameField]?.map((el: DropdownItemType) => el.name).join(", ")
          : placeholder
      }
      search={handleSearch}
      bodyContent={
        <>
          {dropdownItems.map(({ id, name, ...other }: DropdownItemType) => {
            const checked = multiselect
              ? !!values[nameField]?.find(
                  (el: DropdownItemType) => el.id === id
                )
              : id === values[nameField]?.id;
            return (
              <BodyDropdownItem key={id}>
                <label>
                  <Box behavior="rowBetweenAlign">
                    <Text
                      onClick={() => handleSingleChange({ id, name })}
                      cursor="pointer"
                      variant="small"
                    >
                      {name}
                    </Text>
                    {checked && !multiselect && <Icon icon={faCircleCheck} />}
                    {multiselect && (
                      <CheckboxComponent
                        name={nameField}
                        type="checkbox"
                        checked={checked}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleMultiChange({ id, name, ...other })
                        }
                      />
                    )}
                  </Box>
                </label>
              </BodyDropdownItem>
            );
          })}
        </>
      }
    />
  );
};
