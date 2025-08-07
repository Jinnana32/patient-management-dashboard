import { gql } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';
import { generateMockPatients, randomDelayInMs } from '../../utils';
import type { Patient } from '../../types';

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

// stored in memory
export const mockDatabase = generateMockPatients(20);

// Helper to add a patient to the end of the list
export const addMockPatient = (patient: Patient) => {
  mockDatabase.push(patient);
};

export const getPatientMock: MockedResponse = {
  request: { query: GET_PATIENTS },
  variableMatcher: () => true,
  delay: randomDelayInMs(5),
  newData: (variables) => {
    // In a real app, I'd probably use React Query for this
    // but keeping it simple with Apollo for the demo
    const { search, filter, offset = 0, limit = 10 } = variables || {};

    const filteredPatients = mockDatabase.filter((patient) => {
      if (
        search &&
        !patient.name.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (filter && patient.status !== filter) {
        return false;
      }
      return true;
    });

    const total = filteredPatients.length;
    const patients = filteredPatients.slice(offset, offset + limit);

    return {
      data: {
        patients,
        totalCount: total,
      },
    };
  },
};
