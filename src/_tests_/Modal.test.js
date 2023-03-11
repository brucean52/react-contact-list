import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../components/Modal';
import { mockContextValues } from './util/testData';
import {AppContext} from '../AppContext';

test('show add modal', () => {
  render(
    <AppContext.Provider value={mockContextValues}>
      <Modal/>
    </AppContext.Provider>
  );
  const addButton = screen.getByRole('button');
  userEvent.click(addButton)
  expect(screen.getByText('Add Contact')).toBeInTheDocument();
});
