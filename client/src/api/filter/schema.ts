import { gql } from '@apollo/client'

export const PUT_FILTER = gql`
  mutation PutFilter($filter: FilterTypeInput!, $userId: String!) {
    putFilter(filter: $filter, userId: $userId) {
      userId
      filter {
        categories {
          name
          order
          id
        }
        colors {
          id
          name
          color
        }
      }
    }
  }
`;

export const GET_FILTER = gql`
  query GetFilter($userId: String!) {
    getFilter(userId: $userId) {
      userId
      filter {
        categories {
          name
          order
          id
        }
        colors {
          id
          name
          color
        }
      }
    }
  }
`;
