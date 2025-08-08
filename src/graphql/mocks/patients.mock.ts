import type { MockedResponse } from '@apollo/client/testing';
import { addPatientMock } from '../mutations/patient.mutation';
import { getPatientMock } from '../queries/patient.query';

export const mocks: MockedResponse[] = [getPatientMock, addPatientMock];
