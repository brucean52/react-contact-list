import { render, screen } from '@testing-library/react';
import { mockContextValues } from './testData';
import {AppContext} from '../AppContext';
import Table from '../components/Table';

test('table rendering values', () => {
  render(
    <AppContext.Provider value={mockContextValues}>
      <Table/>
    </AppContext.Provider>
  );
  expect(screen.getByText('Marcel')).toBeInTheDocument();
  expect(screen.getByText('Isabella')).toBeInTheDocument();
  expect(screen.getByText('Iris')).toBeInTheDocument();
  expect(screen.getByText('Clearfield')).toBeInTheDocument();
  expect(screen.getByText('Reno')).toBeInTheDocument();
  expect(screen.getByText('Phoenix')).toBeInTheDocument();
});
