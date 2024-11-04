import React from "react";
import { Box, Text } from "src/UI-kit";
import { AnimationBox } from "src/components/animation/animationBox/animationBox";
import { Icon } from "src/components/icons/icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ColorItem } from "src/components/color-picker/color-picker";
import { FilterItem as FilterItemType } from "src/types";
import { FilterItem } from "./styled";

interface IFilterLabel {
  labelItem: FilterItemType & { color?: string };
  onSelect: (value: FilterItemType) => void;
  onDelete: (id: string) => void;
  active?: boolean;
}

export const FilterLabel = ({
  labelItem,
  onSelect,
  onDelete,
  active,
}: IFilterLabel) => {
  return (
    <Box w="fit-content">
      <AnimationBox key={labelItem.id} variantAnimation="labelAnimation">
        <FilterItem active={active} onClick={() => onSelect(labelItem)}>
          {labelItem.color && (
            <ColorItem m="0 10px 0 0" color={labelItem.color} />
          )}
          <Text m={active ? "0 10px 0 0" : ""} cursor="pointer" variant="small">
            {labelItem.name}
          </Text>
          {active && (
            <Icon
              cursor="pointer"
              s="12px"
              icon={faXmark}
              onClick={() => onDelete(labelItem.id)}
            />
          )}
        </FilterItem>
      </AnimationBox>
    </Box>
  );
};
