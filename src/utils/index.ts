import { faker } from '@faker-js/faker';
import type { Patient } from '../types';

export const generateMockPatients = (count: number): Patient[] => {
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
      status: faker.helpers.arrayElement(statuses) as Patient['status'],
      lastVisit: faker.date.recent({ days: 180 }).toISOString().split('T')[0],
      condition: faker.helpers.arrayElement(conditions),
    };
  });
};

export const randomDelayInMs = (max: number) => {
  const delay = max + 1000; // in ms
  return Math.floor(Math.random() * delay) + 1000;
};
