import { render, screen } from '@testing-library/react';
import App from '../App';
import {AppContext} from '../AppContext';
import { mockContextValues } from './testData';

test('renders title', () => {
  render(
    <AppContext.Provider value={mockContextValues}>
      <App />
    </AppContext.Provider>
  );
  const titleElement = screen.getByText(/my contacts/i);
  expect(titleElement).toBeInTheDocument();
});
