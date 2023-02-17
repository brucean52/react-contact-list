import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../components/ContactForm';
import { mockContextValues, testTableDataArray } from './testData';
import {AppContext} from '../AppContext';

describe('Contact Form component', () => {
  test('add contact form with empty values', () => {
    const closeModalFn = jest.fn();
    render(
      <AppContext.Provider value={mockContextValues}>
        <ContactForm
          isEdit={false}
          closeModal={closeModalFn}
          modifyId={""}
          tableData={""}
        />
      </AppContext.Provider>
    );
    expect(screen.getByText('Add Contact')).toBeInTheDocument();
    userEvent.click(screen.getByText('Submit'))
    expect(closeModalFn).toHaveBeenCalledTimes(0);

    expect(screen.getByText('Please enter a valid first name')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid last name')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid street (numbers followed by street name)')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid city')).toBeInTheDocument();
    expect(screen.getByText('Select a State')).toBeInTheDocument();
    expect(screen.getByText('Please enter a 5 digit zip code')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();

    userEvent.click(screen.getByText('Cancel'))
    expect(closeModalFn).toHaveBeenCalledTimes(1);
  });

  test('add contact form and enter values', async () => {
    const closeModalFn = jest.fn();
    render(
      <AppContext.Provider value={mockContextValues}>
        <ContactForm
          isEdit={false}
          closeModal={closeModalFn}
          modifyId={""}
          tableData={""}
        />
      </AppContext.Provider>
    );
    const firstName = screen.getByLabelText('first-name');
    const firstNameInput = within(firstName).getByRole('textbox');
    const lastName = screen.getByLabelText('last-name');
    const lastNameInput = within(lastName).getByRole('textbox');
    const street = screen.getByLabelText('street');
    const streetInput = within(street).getByRole('textbox');
    const city = screen.getByLabelText('city');
    const cityInput = within(city).getByRole('textbox');
    const state = screen.getByLabelText('state');
    const stateInput = within(state).getByRole('button');
    const zip = screen.getByLabelText('zip');
    const zipInput = within(zip).getByRole('textbox');
    const phone = screen.getByLabelText('phone');
    const phoneInput = within(phone).getByRole('textbox');
    const email = screen.getByLabelText('email');
    const emailInput = within(email).getByRole('textbox');

    expect(screen.getByText('Add Contact')).toBeInTheDocument();
    userEvent.type(firstNameInput, 'Jon');
    userEvent.type(lastNameInput, 'Dope');
    userEvent.type(streetInput, '123 Fake Street');
    userEvent.type(cityInput, 'Hayward');
    userEvent.click(stateInput);
    userEvent.click(await screen.findByText('CA'));
    userEvent.type(zipInput, '94544');
    userEvent.type(phoneInput, '5551234567');
    userEvent.type(emailInput, 'fake@gmail.com');

    userEvent.click(screen.getByText('Submit'))
    expect(closeModalFn).toHaveBeenCalledTimes(1);

    expect(screen.queryByText('Please enter a valid first name')).toBeNull();
    expect(screen.queryByText('Please enter a valid last name')).toBeNull();
    expect(screen.queryByText('Please enter a valid street (numbers followed by street name)')).toBeNull();
    expect(screen.queryByText('Please enter a valid city')).toBeNull();
    expect(screen.queryByText('Select a State')).toBeNull();
    expect(screen.queryByText('Please enter a 5 digit zip code')).toBeNull();
    expect(screen.queryByText('Please enter a valid phone number')).toBeNull();
    expect(screen.queryByText('Please enter a valid email')).toBeNull();

    userEvent.click(screen.getByText('Cancel'))
    expect(closeModalFn).toHaveBeenCalledTimes(2);
  });

  test('edit contact form has values', () => {
    const closeModalFn = jest.fn();
    render(
      <AppContext.Provider value={mockContextValues}>
        <ContactForm
          isEdit={true}
          closeModal={closeModalFn}
          modifyId={testTableDataArray[0].id}
          tableData={testTableDataArray}
        />
      </AppContext.Provider>
    );
    const firstName = screen.getByLabelText('first-name');
    const firstNameInput = within(firstName).getByRole('textbox');
    const lastName = screen.getByLabelText('last-name');
    const lastNameInput = within(lastName).getByRole('textbox');
    const street = screen.getByLabelText('street');
    const streetInput = within(street).getByRole('textbox');
    const city = screen.getByLabelText('city');
    const cityInput = within(city).getByRole('textbox');
    const zip = screen.getByLabelText('zip');
    const zipInput = within(zip).getByRole('textbox');
    const phone = screen.getByLabelText('phone');
    const phoneInput = within(phone).getByRole('textbox');
    const email = screen.getByLabelText('email');
    const emailInput = within(email).getByRole('textbox');

    expect(screen.getByText('Edit Contact')).toBeInTheDocument();
    expect(firstNameInput.value).toBe('Marcel');
    expect(lastNameInput.value).toBe('Baxter');
    expect(streetInput.value).toBe('306 Kemper Lane');
    expect(cityInput.value).toBe('Clearfield');
    expect(screen.getByText('UT')).toBeInTheDocument();
    expect(zipInput.value).toBe('84015');
    expect(phoneInput.value).toBe('(801) 825-2691');
    expect(emailInput.value).toBe('hunter.baxter44@gmail.com');

    userEvent.click(screen.getByText('Submit'))
    expect(closeModalFn).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByText('Cancel'))
    expect(closeModalFn).toHaveBeenCalledTimes(2);
  });
});
