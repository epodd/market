import React, { memo, useEffect, useState } from "react";
import {
  Wrapper,
  HeaderBlock,
  NavigationBlock,
  Navigation,
  NavItem,
  NavigationDropdown,
  NavigationDropdownOverlay,
  DropdownItem,
} from "./styled";
import { Text, Box } from "src/UI-kit";
import { Link, useLocation } from "react-router-dom";
import { isAdmin, useAuth } from "src/contexts";
import { Button, Avatar } from "src/UI-kit";
import styled from "styled-components";
import { ICategory, IFilter, ISubCategory, ITypeClothes } from "src/types";
import { useRouter } from "src/hooks/useRouter";
import _ from "lodash";
import { Icon } from "../icons/icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "src/contexts/store/hooks/use-store";
import { useCart } from "src/contexts/cart/hooks/use-cart";
import { ACCOUNT_PATH, SIGN_IN_PATH } from "src/routes/routes-config";

const LogoWrapper = styled(Box)`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

const CartCount = styled.div`
  position: absolute;
  top: -6px;
  right: -4px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: black;
  color: white;
`;

interface IHeaderProps {
  setCartModalOpen: (arg: boolean) => void;
  setFilter: (arg: IFilter) => void;
}

export const Header = memo(({ setCartModalOpen, setFilter }: IHeaderProps) => {
  const { categories, setActiveCategory, activeCategory } = useStore();
  const { isAuthenticated, user, signOut } = useAuth();
  const { products } = useCart();
  const { push, pathname } = useRouter();
  const [dropdownItems, setDropdownItems] = useState<
    ISubCategory[] | undefined
  >();

  useEffect(() => {
    if (!activeCategory) {
      setDropdownItems([]);
    }

    setDropdownItems(
      categories?.find((el) => {
        if (el.id === activeCategory?.id) {
          return el;
        }
      })?.subCategory
    );
  }, [activeCategory]);

  const LinkComp = pathname === "/" ? Box : Link;

  return (
    <Wrapper>
      <HeaderBlock>
        <Box>
          <Text variant="small">Contact us</Text>
          {isAdmin(user) && (
            <Button w="120px" m="0 0 0 15px" onClick={() => push("/admin")}>
              Admin panel
            </Button>
          )}
        </Box>
        <LinkComp to="/">
          <LogoWrapper behavior="column">
            <Text cursor="pointer" textAlign="center" variant="huge">
              VALUES
            </Text>
            <Text
              cursor="pointer"
              ls="1.2px"
              textAlign="center"
              variant="small"
            >
              collection
            </Text>
          </LogoWrapper>
        </LinkComp>
        <Box behavior="rowAlignCenterEnd">
          {!isAuthenticated && (
            <Text m="0 10px 0 0" variant="small">
              <Link to={SIGN_IN_PATH}>Login</Link>
            </Text>
          )}
          {isAuthenticated && (
            <Box behavior="rowAlignCenter">
              <Text
                cursor="pointer"
                variantHover="underline"
                m="0 10px 0 15px"
                variant="small"
                onClick={() => push(ACCOUNT_PATH)}
              >
                My Account
              </Text>
              <Box
                m="0 30px 0 15px"
                onMouseEnter={() => setCartModalOpen(true)}
                position="relative"
              >
                <Icon cursor="pointer" icon={faCartShopping} />
                {products.length ? (
                  <CartCount>
                    <Text color="white" s={10}>
                      {products.length}
                    </Text>
                  </CartCount>
                ) : null}
              </Box>
              <Text
                cursor="pointer"
                variantHover="underline"
                variant="small"
                onClick={() => user && signOut(user.id)}
              >
                Logout
              </Text>
            </Box>
          )}
        </Box>
      </HeaderBlock>
      {/*{isAuthenticated && (*/}
      <NavigationBlock>
        <Navigation>
          {categories?.map((item: ICategory) => {
            return (
              <NavItem
                onMouseEnter={() => setActiveCategory(item)}
                active={item.id === activeCategory?.id}
                key={item.id}
              >
                {item.name}
              </NavItem>
            );
          })}
        </Navigation>
        <Box>
          <NavigationDropdown>
            {/*<AnimationPresenceBox*/}
            {/*  renderWhen={!!dropdownItems?.length}*/}
            {/*  variantAnimation="headerDropdown"*/}
            {/*>*/}
            <Box h="fit-content" behavior="rowBetweenAroundAlign" w="100%">
              {dropdownItems?.map((subCategory: ISubCategory) => {
                if (!subCategory.typeClothes.length) return;
                return (
                  <DropdownItem
                    w="100%"
                    key={subCategory.id}
                    behavior="columnStart"
                  >
                    <Text font="bold" variant="medium">
                      {subCategory.name}
                    </Text>
                    <Box behavior="column" m="10px 0 0 0">
                      {subCategory.typeClothes.map((thing: ITypeClothes) => {
                        return (
                          <Text
                            cursor="pointer"
                            variantHover="underline"
                            m="10px 0 0 0"
                            key={thing.id}
                            variant="small"
                            onClick={() => {
                              if (!activeCategory) return;
                              setFilter({
                                colors: [],
                                categories: [
                                  {
                                    ..._.omit(activeCategory, "subCategory"),
                                    order: "0",
                                  },
                                  {
                                    ..._.omit(subCategory, "typeClothes"),
                                    order: "1",
                                  },
                                  {
                                    ...thing,
                                    order: "2",
                                  },
                                ],
                              });
                              if (pathname !== "/") {
                                push("");
                              }
                              setActiveCategory(null);
                            }}
                          >
                            {thing.name}
                          </Text>
                        );
                      })}
                    </Box>
                  </DropdownItem>
                );
              })}
            </Box>

            {/*</AnimationPresenceBox>*/}
          </NavigationDropdown>
          {/*<AnimationPresenceBox*/}
          {/*  renderWhen={!!dropdownItems?.length}*/}
          {/*  variantAnimation="overlayAnimation"*/}
          {/*>*/}
          {!!dropdownItems?.length && (
            <NavigationDropdownOverlay
              onMouseEnter={() => setActiveCategory(null)}
            />
          )}
          {/*</AnimationPresenceBox>*/}
        </Box>
      </NavigationBlock>
      {/*)}*/}
    </Wrapper>
  );
});
