import React, { memo } from "react";
import { Text, Box, Button, Avatar } from "src/UI-kit";
import { useAuth } from "src/contexts";
import { useRouter } from "src/hooks/useRouter";
import { Wrapper, InfoBlock, NavigationItem, Navigation } from "./styled";

const navItems = [
  {
    name: "Category",
    route: "/admin/category",
  },
  {
    name: "Product",
    route: "/admin/product",
  },
  {
    name: "Color",
    route: "/admin/color",
  },
  {
    name: "Offers",
    route: "/admin/offers",
  },
];

const Sidebar = memo(() => {
  const { user } = useAuth();
  const { pathname, push } = useRouter();

  return (
    <Wrapper>
      <InfoBlock>
        <Avatar s="100px" />
        <Text m="20px 0 0 0" textAlign="center" variant="small">
          Account: {user?.email}
        </Text>
        <Text textAlign="center" variant="small">
          Name: {user?.name}
        </Text>
        <Text textAlign="center" variant="small">
          Role: {user?.role}
        </Text>
        <Button
          p="10px 20px"
          m="20px 0 0 0"
          w="fit-content"
          h="fit-content"
          onClick={() => push("/")}
        >
          Return to market
        </Button>
      </InfoBlock>
      <Navigation>
        {navItems.map((el: any, i: number) => {
          return (
            <NavigationItem
              key={i}
              active={pathname === el.route}
              onClick={() => push(el.route)}
            >
              <Text variantHover="underline" cursor="pointer">
                {el.name}
              </Text>
            </NavigationItem>
          );
        })}
      </Navigation>
    </Wrapper>
  );
});

export default Sidebar;
