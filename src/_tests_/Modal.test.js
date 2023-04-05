import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import Modal from '../components/Modal';

test('show add modal', () => {
  render(
    <RecoilRoot>
      <Modal />
    </RecoilRoot>
  );
  const addButton = screen.getByRole('button');
  userEvent.click(addButton)
  expect(screen.getByText('Add Contact')).toBeInTheDocument();
});
