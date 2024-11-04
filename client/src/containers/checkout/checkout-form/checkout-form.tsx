import React from "react";
import styled, { useTheme } from "styled-components";
import { Box, Button, Text, InputWithLabel } from "src/UI-kit";
import { Form } from "react-final-form";
import { useCreateOffer } from "../../../api/offer/useRequests";
import { useAuth } from "../../../contexts";

const FormBlock = styled(Box)`
  height: 100%;
  width: 500px;
  border-radius: 7px;
  background-color: rgba(154, 154, 154, 0.18);

  padding: 20px 20px;
  box-sizing: border-box;
`;

const InputRow = styled(Box)`
  margin-bottom: 20px;

  &:last-of-type {
    margin: 0;
  }
`;

type OfferFormType = {
  name: string;
  address: string;
  country: string;
  city: string;
  phoneNumber: string;
};

const CheckoutForm = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [createOffer] = useCreateOffer();

  const handleCreateOffer = (data: OfferFormType) => {
    if (!user?.id) return;
    createOffer({
      variables: { data: { ...data, userId: user?.id, status: "new" } },
      onCompleted: (data) => console.log(data),
    });
  };

  return (
    <FormBlock>
      <Form
        initialValues={{}}
        onSubmit={handleCreateOffer}
        render={({ handleSubmit, form: { reset } }) => {
          return (
            <Box w="100%" behavior="column">
              <InputRow w="100%" behavior="rowBetweenAlign">
                <Box w="47%">
                  <InputWithLabel placeholder="Name" label="Name" name="name" />
                </Box>
                <Box w="47%">
                  <InputWithLabel
                    placeholder="Phone Number"
                    label="Number"
                    name="phoneNumber"
                  />
                </Box>
              </InputRow>
              <InputRow w="100%" behavior="rowBetweenAlign">
                <Box w="47%">
                  <InputWithLabel
                    placeholder="Country"
                    label="Country"
                    name="country"
                  />
                </Box>
                <Box w="47%">
                  <InputWithLabel placeholder="City" label="City" name="city" />
                </Box>
              </InputRow>
              <InputRow w="100%" behavior="rowBetweenAlign">
                <InputWithLabel
                  placeholder="Address"
                  label="Address"
                  name="address"
                />
              </InputRow>
              <Button
                w="100%"
                h="40px"
                m="20px 0 0 0"
                onClick={() => {
                  handleSubmit()?.then((res) => reset());
                }}
              >
                <Text color={colors.white} variant="small">
                  OFFER
                </Text>
              </Button>
            </Box>
          );
        }}
      />
    </FormBlock>
  );
};

export default CheckoutForm;
