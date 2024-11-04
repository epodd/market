import React, { ReactNode, useEffect, useRef } from "react";
import { Box, Text } from "src/UI-kit";
import { AnimationPresenceBox, Icon } from "src/components/index";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ModalBlockLayer, ModalContent, ModalWrapper } from "./styled";
import { useHover } from "../../hooks/useHover";

type FilterModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  closeWhenLeave?: boolean;
  top?: string;
  loading?: boolean;
  content: ReactNode;
};

export const Modal = ({
  open,
  title,
  setOpen,
  closeWhenLeave,
  content,
  loading,
  top,
}: FilterModalProps) => {
  const modalRef = useRef<any>();
  const { isHover } = useHover(modalRef, open);

  useEffect(() => {
    if (!closeWhenLeave) return;
    if (!isHover) {
      setOpen(false);
    }
  }, [isHover]);

  return (
    <ModalWrapper top={top}>
      <AnimationPresenceBox renderWhen={open} variantAnimation="filterModal">
        <ModalContent ref={modalRef}>
          <Box m="0 0 50px 0" behavior="rowBetweenAlign">
            <Text variant="small">{title}</Text>
            <Icon
              cursor="pointer"
              onClick={() => setOpen(false)}
              icon={faXmark}
            />
          </Box>
          {content}
          {loading && <ModalBlockLayer />}
        </ModalContent>
      </AnimationPresenceBox>
    </ModalWrapper>
  );
};
