import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { MockedProvider } from '@apollo/client/testing';
import { mocks } from './graphql/mocks/patients.mock';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  </StrictMode>
);
