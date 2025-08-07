import { gql } from '@apollo/client';
import type { MockedResponse } from '@apollo/client/testing';
import { randomDelayInMs } from '../../utils';
import { addMockPatient } from '../queries';

export const ADD_PATIENT = gql`
  mutation AddPatient($input: NewPatientInput!) {
    addPatient(input: $input) {
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

export const addPatientMock: MockedResponse = {
  request: { query: ADD_PATIENT },
  variableMatcher: () => true,
  delay: randomDelayInMs(5),
  newData: ({ input }) => {
    const newPatient = {
      id: `patient-${Math.floor(Math.random() * 1000)}`,
      ...input,
    };

    addMockPatient(newPatient);

    return { data: { addPatient: newPatient } };
  },
};
