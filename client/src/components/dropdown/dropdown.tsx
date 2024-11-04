import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Input, Text } from "src/UI-kit";
import { BodyDropdown, HeadDropdown, SearchBlock } from "./styled";
import { ActiveIcon } from "../select/styled";
import {
  faArrowDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../icons/icons";

export const Dropdown = ({
  bodyContent,
  value,
  search,
  placeholder = "Select",
  searchPlaceholder = "Enter search request",
}: {
  value?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  search?: (value: string) => void;
  bodyContent: ReactNode;
}) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [bodySize, setBodySize] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });

  useEffect(() => {
    if (!dropdownRef?.current) return;
    setBodySize({
      w: dropdownRef.current.getBoundingClientRect().width,
      h: dropdownRef.current.getBoundingClientRect().height,
    });
  }, [dropdownRef.current, bodyContent]);

  return (
    <Box m="15px 0 20px 0" behavior="column" w={bodySize.w + "px"}>
      <HeadDropdown
        w={bodySize.w + "px"}
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <Box p="0 16px 0 10px" h="fit-content" behavior="rowBetweenAlign">
          <Text variant="small">{value || placeholder}</Text>
          <ActiveIcon open={openDropdown} s="14px" icon={faArrowDown} />
        </Box>
      </HeadDropdown>
      <BodyDropdown open={openDropdown} h={bodyContent ? bodySize.h + 20 : 40}>
        {search && (
          <SearchBlock p="0 15px" behavior="rowBetweenAlign">
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                search(e.target.value)
              }
              placeholder={searchPlaceholder || "Enter search type"}
            />
            <Icon icon={faMagnifyingGlass} />
          </SearchBlock>
        )}
        <Box
          style={{ overflowY: "scroll", maxHeight: "200px" }}
          ref={dropdownRef}
          behavior="column"
          p="0 0 20px 0"
        >
          {bodyContent || <Box h="30px" />}
        </Box>
      </BodyDropdown>
    </Box>
  );
};
