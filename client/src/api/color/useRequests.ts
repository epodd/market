import { useMutation, useQuery } from "@apollo/client";
import { IColor } from "src/types";
import { ADD_COLOR, DELETE_COLOR, GET_COLORS } from './schema'

const useAddColor = () => useMutation(ADD_COLOR);
const useDeleteColor = () => useMutation(DELETE_COLOR);
const useGetColors = () => useQuery<{ getColors: IColor[] }>(GET_COLORS);

export { useAddColor, useGetColors, useDeleteColor };
