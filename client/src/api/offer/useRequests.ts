import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_OFFER, GET_OFFERS } from "./schema";

const useCreateOffer = () => useMutation(CREATE_OFFER);
const useGetOffers = () => useLazyQuery(GET_OFFERS);

export { useGetOffers, useCreateOffer };
