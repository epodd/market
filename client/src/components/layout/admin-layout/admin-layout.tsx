import React, { ReactNode } from "react";
import { Box } from "src/UI-kit";
import Sidebar from "src/components/sidebar/sidebar";
import { AnimationBox } from "@components";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box behavior="column">
      <Box behavior="row" h="100vh">
        <Box w="30%">
          <Sidebar />
        </Box>
        <AnimationBox variantAnimation="pageAnimation">{children}</AnimationBox>
      </Box>
    </Box>
  );
};
