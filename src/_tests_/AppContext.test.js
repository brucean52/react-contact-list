import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppProvider from '../AppContext';
import RenderContextTestComponent from './util/RenderContextTestComponent';

describe('App Context tests', () => {
  test('can add, edit, and delete a contact', async () => {
    render(
      <AppProvider>
        <RenderContextTestComponent />
      </AppProvider>
    );

    expect(within(screen.getByLabelText('reset-table-sort-value')).getByText('false')).toBeInTheDocument();
    userEvent.click(screen.getByLabelText('add-btn-mock-contact-one'));
    expect(screen.getByText('abc123')).toBeInTheDocument();
    expect(screen.getByText('CJ Summers')).toBeInTheDocument();
    expect(screen.getByText('6541 Ocean Drive')).toBeInTheDocument();
    expect(within(screen.getByLabelText('reset-table-sort-value')).getByText('true')).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('edit-btn-mock-contact-one'));
    expect(screen.getByText('Carlton Summers')).toBeInTheDocument();
    expect(screen.queryByText('CJ')).not.toBeInTheDocument();
    expect(screen.getByText('5241 Winton Ave')).toBeInTheDocument();
    expect(screen.queryByText('6541 Ocean Drive')).not.toBeInTheDocument();

    userEvent.click(screen.getByLabelText('delete-btn-mock-contact-one'));
    expect(screen.queryByText('Carlton Summers')).not.toBeInTheDocument();
    expect(screen.queryByText('5241 Winton Ave')).not.toBeInTheDocument();

    userEvent.click(screen.getByLabelText('reset-table-sort'));
    expect(within(screen.getByLabelText('reset-table-sort-value')).getByText('false')).toBeInTheDocument();
  });

});

