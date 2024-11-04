import React, { memo, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Text, Box } from "src/UI-kit";
import { useFormState } from "react-final-form";
import { Icon } from "src/components";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Label = styled.label``;

const InputFileHidden = styled.input`
  display: none;
`;

const CustomizeDropzone = styled.div<{ drag?: boolean }>`
  width: 100%;
  height: 80px;
  border: dashed 2px grey;
  border: ${({ drag, theme }) =>
    drag ? `dashed 2px ${theme.colors.green}` : "dashed 2px grey"};
  background-color: ${({ theme, drag }) =>
    drag ? theme.colors.green_light : theme.colors.gray_light};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  stroke-dashoffset: 23;
  transition: 0.5s;
  box-sizing: border-box;
  transform: ${({ drag }) => (drag ? "scale(1.1)" : "scale(1)")};
`;

export const InputFile = ({
  onChange,
  name = "files",
}: {
  onChange: (arg: File[]) => void;
  name?: string;
}) => {
  const { values } = useFormState();
  const { colors } = useTheme();
  const [drag, setDrag] = useState(false);

  const handleDeleteImage = (id: string) => {
    onChange(values[name]?.filter((el: any) => id !== el.lastModified));
  };

  const handleStartDrag = (e: any) => {
    e.preventDefault();
    setDrag(true);
  };
  const handleEndDrag = (e: any) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    onChange(Object.values(e.dataTransfer.files || {}));
    setDrag(false);
  };

  return (
    <Box behavior="column">
      <Label
        onDragStart={handleStartDrag}
        onDragLeave={handleEndDrag}
        onDragOver={handleStartDrag}
        onDrop={handleDrop}
      >
        <InputFileHidden
          type="file"
          multiple
          onChange={(e) => onChange(Object.values(e?.target?.files || {}))}
        />
        <CustomizeDropzone drag={drag}>
          <Text cursor="pointer" variant="small">
            {!drag ? "Move files here" : "Drop files"}
          </Text>
        </CustomizeDropzone>
      </Label>
      {values[name]?.map((el: any, i: number) => {
        return (
          <Box m="5px 0 0 0" key={el.lastModified} behavior="rowAlignCenter">
            <Text m="0 15px 0 0 " variant="small">
              {el.name}
            </Text>
            <Icon
              cursor="pointer"
              onClick={() => {
                handleDeleteImage(el.lastModified);
              }}
              icon={faTrash}
              w="12px"
              color={colors.black_medium}
            />
          </Box>
        );
      })}
    </Box>
  );
};
