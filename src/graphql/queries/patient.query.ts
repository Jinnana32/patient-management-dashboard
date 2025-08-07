import { gql } from '@apollo/client';

export const GET_PATIENTS = gql`
  query GetPatients(
    $search: String
    $filter: String
    $offset: Int
    $limit: Int
  ) {
    patients(search: $search, filter: $filter, offset: $offset, limit: $limit) {
      id
      name
      email
      phone
      dateOfBirth
      gender
      status
      lastVisit
      age
      condition
    }
  }
`;
