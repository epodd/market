import React, { memo, ReactNode, useCallback, useState } from "react";
import {
  Wrapper,
  HeaderWrapper,
  Main,
  SpinnerWrapper,
  SpinnerOverlay,
} from "./styled";
import { Header, AnimationBox } from "@components";
import { CartModal } from "src/modals/cart-modal/cart-modal";
import { ACCOUNT_PATH, CHECKOUT_PATH } from "src/routes/routes-config";
import { useRouter } from "../../../hooks/useRouter";
import { theme } from "@ui";
import { useFilter } from "@contexts";
import { useReactiveVar } from "@apollo/client";
import { Spinner } from "@components";
import { loadingVar } from "@store";

const getBackgroundColor = (path: string) => {
  if (path.indexOf(CHECKOUT_PATH) > -1) {
    return theme.colors.sand;
  }

  if (path.indexOf(ACCOUNT_PATH) > -1) {
    return theme.colors.mid_brown;
  }

  return theme.colors.white;
};

const MemoMain = memo(({ children }: any) => {
  return <Main>{children}</Main>;
});

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);
  const { setFilter } = useFilter();
  const isLoading = useReactiveVar(loadingVar);

  const { pathname } = useRouter();
  return (
    <Wrapper bgcolor={getBackgroundColor(pathname)}>
      <CartModal setOpen={setCartModalOpen} open={cartModalOpen} />
      <HeaderWrapper>
        <Header setCartModalOpen={setCartModalOpen} setFilter={setFilter} />
      </HeaderWrapper>
      <AnimationBox variantAnimation="pageAnimation">
        <MemoMain>{children}</MemoMain>
      </AnimationBox>
      <SpinnerWrapper>{isLoading && <Spinner />}</SpinnerWrapper>
      {isLoading && <SpinnerOverlay />}
    </Wrapper>
  );
};
