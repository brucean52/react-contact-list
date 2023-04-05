import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import DeleteConfirm from '../components/DeleteConfirm';
import { testTableDataArray } from './util/testData';

test('delete confirm', () => {
  const closeModalFn = jest.fn();
  render(
    <RecoilRoot>
      <DeleteConfirm
        closeModal={closeModalFn}
        modifyId={testTableDataArray[0].id}
        tableData={testTableDataArray}
      />
    </RecoilRoot>
  );
  expect(screen.getByText('Delete Contact')).toBeInTheDocument();
  expect(screen.getByLabelText('delete-message')).toHaveTextContent('Marcel Baxter');
  userEvent.click(screen.getByText('Delete'))
  expect(closeModalFn).toHaveBeenCalledTimes(1);
  userEvent.click(screen.getByText('Cancel'))
  expect(closeModalFn).toHaveBeenCalledTimes(2);
});

test('no modifyId, no contact to delete', () => {
  const closeModalFn = jest.fn();
  render(
    <RecoilRoot>
      <DeleteConfirm
        closeModal={closeModalFn}
        modifyId={""}
        tableData={testTableDataArray}
      />
    </RecoilRoot>
  );
  expect(screen.getByText('Delete Contact')).toBeInTheDocument();
  userEvent.click(screen.getByText('Delete'))
  expect(closeModalFn).toHaveBeenCalledTimes(0);
  userEvent.click(screen.getByText('Cancel'))
  expect(closeModalFn).toHaveBeenCalledTimes(1);
});
