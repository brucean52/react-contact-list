import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockContextValues, mockContextFullContactArrayValues } from './util/testData';
import {AppContext} from '../AppContext';
import Table from '../components/Table';

describe('Table Component Tests', () => {
  test('table can render values and can sort asc/des', () => {
    render(
      <AppContext.Provider value={mockContextValues}>
        <Table/>
      </AppContext.Provider>
    );

    userEvent.click(screen.getByText('Last'));
    expect(within(screen.getByLabelText('table-row0')).getByText('Baxter')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row1')).getByText('Bond')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row2')).getByText('Brooks')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row3')).getByText('Carr')).toBeInTheDocument();

    userEvent.click(screen.getByText('Last'));
    expect(within(screen.getByLabelText('table-row0')).getByText('Carr')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row1')).getByText('Brooks')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row2')).getByText('Bond')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row3')).getByText('Baxter')).toBeInTheDocument();

    // test phone and email since the are rendered seperately from name/address
    userEvent.click(screen.getByText('Phone'));
    expect(within(screen.getByLabelText('table-row0')).getByText('(201) 299-4115')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row1')).getByText('(602) 532-6824')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row2')).getByText('(775) 862-4408')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row3')).getByText('(801) 825-2691')).toBeInTheDocument();

    userEvent.click(screen.getByText('Phone'));
    expect(within(screen.getByLabelText('table-row0')).getByText('(801) 825-2691')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row1')).getByText('(775) 862-4408')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row2')).getByText('(602) 532-6824')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row3')).getByText('(201) 299-4115')).toBeInTheDocument();

    userEvent.click(screen.getByText('Email'));
    expect(within(screen.getByLabelText('table-row0')).getByText('hunter.baxter44@gmail.com')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row1')).getByText('isabella.carr98@yahoo.com')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row2')).getByText('jbrooks82967@example.org')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row3')).getByText('miss.iris04@gmail.com')).toBeInTheDocument();

    userEvent.click(screen.getByText('Email'));
    expect(within(screen.getByLabelText('table-row0')).getByText('miss.iris04@gmail.com')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row1')).getByText('jbrooks82967@example.org')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row2')).getByText('isabella.carr98@yahoo.com')).toBeInTheDocument();
    expect(within(screen.getByLabelText('table-row3')).getByText('hunter.baxter44@gmail.com')).toBeInTheDocument();
  });

  test('table can render values and edit/delete action icons can be clicked', () => {
    render(
      <AppContext.Provider value={mockContextValues}>
        <Table/>
      </AppContext.Provider>
    );

    userEvent.click(screen.getByLabelText('edit-row0'));
    expect(screen.getByText('Edit Contact')).toBeInTheDocument();
    userEvent.click(screen.getByText(/cancel/i));
    userEvent.click(screen.getByLabelText('delete-row0'));
    expect(screen.getByText('Delete Contact')).toBeInTheDocument();
    userEvent.click(screen.getByText(/cancel/i));
  });

  test('pagination tests', () => {
    render(
      <AppContext.Provider value={mockContextFullContactArrayValues}>
        <Table/>
      </AppContext.Provider>
    );

    const paginPrevPage = within(screen.getByLabelText('table-pagination')).getByLabelText('Go to previous page');
    const paginNextPage = within(screen.getByLabelText('table-pagination')).getByLabelText('Go to next page');
    
    expect(screen.getByText('1–10 of 30')).toBeInTheDocument();
    userEvent.click(within(screen.getByLabelText('table-pagination')).getByText('10'));
    userEvent.click(screen.getByText('25'));
    expect(screen.getByText('1–25 of 30')).toBeInTheDocument();
    userEvent.click(paginNextPage);
    expect(screen.getByText('26–30 of 30')).toBeInTheDocument();
    userEvent.click(paginPrevPage);
    expect(screen.getByText('1–25 of 30')).toBeInTheDocument();
  });
});

