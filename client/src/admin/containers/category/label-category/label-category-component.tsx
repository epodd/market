import React, { ChangeEvent } from "react";
import { Box, Input, Text } from "src/UI-kit";
import { CategoryTypes } from "../types";
import { LabelCategory } from "./styled";
import { Icon } from "src/components";
import {
  faCirclePlus,
  faTrash,
  faCircleCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "styled-components";
import { Field, Form } from "react-final-form";
import { deepIDNames } from "../category-container";
import { LabelsContainerType, LabelType } from "./types";

const Label = ({
  activeItem,
  deepIndex,
  id,
  setActiveItem,
  name,
  deleteAction,
  actionArguments,
}: LabelType) => {
  const { colors } = useTheme();
  return (
    <Box m="0 15px 0 0" behavior="rowAlignCenter">
      <LabelCategory
        active={activeItem.id === id}
        onClick={() => setActiveItem && setActiveItem({ id, name })}
      >
        <Text cursor="pointer" m="0 10px 0 0">
          {name}
        </Text>
        <Icon
          cursor="pointer"
          onClick={(e: ChangeEvent<HTMLDivElement>) => {
            e.stopPropagation();
            deleteAction({
              ...actionArguments,
              name,
              [deepIDNames[deepIndex as keyof typeof deepIDNames]]: id,
            });
          }}
          icon={faTrash}
          w="12px"
          color={colors.black_medium}
        />
      </LabelCategory>
    </Box>
  );
};

export const LabelsContainer = ({
  labelItems,
  activeItem,
  deepIndex,
  setActiveItem,
  deleteAction,
  actionArguments,
  createAction,
  setCreateType,
  createType = "default",
  labelsType,
  title,
}: LabelsContainerType) => {
  const { colors } = useTheme();
  return (
    <Box behavior="column">
      <Text m="20px 0 20px 0" font="bold" variant="medium">
        {title}
      </Text>
      <Box behavior="row">
        {labelItems.map(({ id, name }) => {
          return (
            <Label
              key={id}
              id={id}
              deepIndex={deepIndex}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              name={name}
              deleteAction={deleteAction}
              actionArguments={actionArguments}
            />
          );
        })}
        {createType === CategoryTypes[labelsType] ? (
          <Form
            onSubmit={(data) => {
              createAction({
                ...actionArguments,
                typeRequest: labelsType,
                name: data?.nameNewEssence,
              });
            }}
            render={({ handleSubmit }) => (
              <Box behavior="rowAlignCenter">
                <Field
                  name="nameNewEssence"
                  render={({ input }) => {
                    return (
                      <Input
                        m="0 15px 0 0"
                        h="30px"
                        w="100px"
                        p="5px 10px"
                        placeholder="Name..."
                        {...input}
                      />
                    );
                  }}
                ></Field>
                <Icon
                  cursor="pointer"
                  onClick={handleSubmit}
                  icon={faCircleCheck}
                  color={colors.green}
                />
                <Icon
                  m="0 0 0 10px"
                  cursor="pointer"
                  onClick={() => setCreateType("")}
                  icon={faXmark}
                  color={colors.red}
                />
              </Box>
            )}
          />
        ) : (
          <Box behavior="rowAlignCenter">
            <Icon
              cursor="pointer"
              onClick={() => setCreateType(CategoryTypes[labelsType])}
              icon={faCirclePlus}
              color={colors.green}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
