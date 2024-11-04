import { gql } from "@apollo/client";

export const CREATE_OFFER = gql`
  mutation CreateOffer($data: OfferInputType!) {
    createOffer(data: $data) {
      id
      name
      phoneNumber
      country
      city
      userId
      address
      status
      createAt
    }
  }
`;

export const GET_OFFERS = gql`
  query GetOffers {
    getOffers {
      id
      name
      phoneNumber
      country
      city
      userId
      address
      status
      createAt
    }
  }
`;
