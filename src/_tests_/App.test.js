import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import App from '../App';

test('renders title', () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  const titleElement = screen.getByText(/my contacts/i);
  expect(titleElement).toBeInTheDocument();
});
