import React from "react";
import { Container } from "src/components/container/container";
import { Text, Box } from "src/UI-kit";
import { useAuth } from "../../contexts";

export const AccountPage = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Box p="20px 0" behavior="column" w="50%">
        <Text m="0 0 30px 0" variant="small">
          YOUR PERSONAL DASHBOARD
        </Text>
        <Text variant="small">
          {`Welcome ${user?.name}. Here you can keep track of your recent activity,
          request returns and exchanges as well as view and edit your account.`}
        </Text>
      </Box>
    </Container>
  );
};
