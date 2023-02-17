import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteConfirm from '../components/DeleteConfirm';
import { mockContextValues, testTableDataArray } from './testData';
import {AppContext} from '../AppContext';

test('delete confirm', () => {
  const closeModalFn = jest.fn();
  render(
    <AppContext.Provider value={mockContextValues}>
      <DeleteConfirm
        closeModal={closeModalFn}
        modifyId={testTableDataArray[0].id}
        tableData={testTableDataArray}
      />
    </AppContext.Provider>
  );
  expect(screen.getByText('Delete Contact')).toBeInTheDocument();
  expect(screen.getByLabelText('delete-message')).toHaveTextContent('Marcel Baxter');
  userEvent.click(screen.getByText('Delete'))
  expect(closeModalFn).toHaveBeenCalledTimes(1);
  userEvent.click(screen.getByText('Cancel'))
  expect(closeModalFn).toHaveBeenCalledTimes(2);
});
