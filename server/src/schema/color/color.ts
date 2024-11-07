import colorService from "../../services/color/color-service";
import { gql } from 'apollo-server-express'


export const colorsTypeDefs = gql`
    input NewColorInputType {
        name: String!
        color: String!
    }
    
    type NewColorType {
        name: String!
        color: String!
    }
    
    input ColorInputType {
        data: NewColorInputType
    }
    
    type ColorType {
        name: String!
        color: String!
        id: String!
        createAt: String!
    }
    
    
    type Mutation {
        addColor(data: NewColorInputType!): ColorType!
        deleteColor(colorId: String!): ColorType!
    }
    
    type Query {
        getColors: [ColorType!]!
    }
`


export const ColorsMutations = {
  addColor: colorService.addColor,
  deleteColor: colorService.deleteColor
}


export const ColorQueries = {
  getColors: colorService.getColors
}

