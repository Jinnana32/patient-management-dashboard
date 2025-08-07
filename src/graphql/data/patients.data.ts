// File: src/mocks/mockData.ts
import type { MockedResponse } from '@apollo/client/testing';
import { GET_PATIENTS } from '../queries';

import { faker } from '@faker-js/faker';

export const generateMockPatients = (count: number) => {
  const conditions = [
    'Hypertension',
    'Diabetes',
    'Asthma',
    'Arthritis',
    'Heart Disease',
  ];
  const statuses = ['active', 'inactive', 'pending'];

  return Array.from({ length: count }, () => {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 20, max: 80 }),
      gender: faker.person.sexType(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      dateOfBirth: faker.date
        .birthdate({ min: 1950, max: 2005, mode: 'year' })
        .toISOString()
        .split('T')[0],
      status: faker.helpers.arrayElement(statuses),
      lastVisit: faker.date.recent({ days: 180 }).toISOString().split('T')[0],
      condition: faker.helpers.arrayElement(conditions),
    };
  });
};

const mockDatabase = generateMockPatients(100);

export const mocks: MockedResponse[] = [
  {
    request: { query: GET_PATIENTS },
    variableMatcher: () => true, // This tells Apollo to match ANY variables
    newData: (variables) => {
      console.log('🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶');
      console.log('variables:', variables);
      // In a real app, I'd probably use React Query for this
      // but keeping it simple with Apollo for the demo
      const { search, filter, offset = 0, limit = 10 } = variables || {};

      // TODO: Add debouncing to search in production
      // This simulates our actual patient database filtering
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

      // Simulate the pagination our backend would do
      const total = filteredPatients.length;
      const patients = filteredPatients.slice(offset, offset + limit);

      return {
        data: {
          patients,
          totalCount: total, // Frontend needs this for pagination
        },
      };
    },
  },
];
