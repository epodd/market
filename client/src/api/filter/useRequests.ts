import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_FILTER, PUT_FILTER } from "./schema";

const usePutFilter = () => useMutation(PUT_FILTER);
const useGetFilter = () => useLazyQuery(GET_FILTER);

export { usePutFilter, useGetFilter };
