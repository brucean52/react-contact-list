import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import ContactForm from '../components/ContactForm';
import { testTableDataArray } from './util/testData';

describe('Contact Form component', () => {
  test('add contact form with empty values', () => {
    const closeModalFn = jest.fn();
    render(
      <RecoilRoot>
        <ContactForm
          isEdit={false}
          closeModal={closeModalFn}
          modifyId={""}
          tableData={""}
        />
      </RecoilRoot>
    );
    expect(screen.getByText('Add Contact')).toBeInTheDocument();
    userEvent.click(screen.getByText('Submit'));
    expect(closeModalFn).toHaveBeenCalledTimes(0);

    expect(screen.getByText('Please enter a valid first name')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid last name')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid street (numbers followed by street name)')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid city')).toBeInTheDocument();
    expect(screen.getByText('Select a State')).toBeInTheDocument();
    expect(screen.getByText('Please enter a 5 digit zip code')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();

    userEvent.click(screen.getByText('Cancel'));
    expect(closeModalFn).toHaveBeenCalledTimes(1);
  });

  test('add contact form and enter values', async () => {
    const closeModalFn = jest.fn();
    render(
      <RecoilRoot>
        <ContactForm
          isEdit={false}
          closeModal={closeModalFn}
          modifyId={""}
          tableData={""}
        />
      </RecoilRoot>
    );
    const firstName = screen.getByLabelText('first-name-input');
    const firstNameInput = within(firstName).getByRole('textbox');
    const lastName = screen.getByLabelText('last-name-input');
    const lastNameInput = within(lastName).getByRole('textbox');
    const street = screen.getByLabelText('street-input');
    const streetInput = within(street).getByRole('textbox');
    const city = screen.getByLabelText('city-input');
    const cityInput = within(city).getByRole('textbox');
    const state = screen.getByLabelText('state-input');
    const stateInput = within(state).getByRole('button');
    const zip = screen.getByLabelText('zip-input');
    const zipInput = within(zip).getByRole('textbox');
    const phone = screen.getByLabelText('phone-input');
    const phoneInput = within(phone).getByRole('textbox');
    const email = screen.getByLabelText('email-input');
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

    userEvent.click(screen.getByText('Submit'));
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

  test('first name input validation', async () => {
    const closeModalFn = jest.fn();
    render(
      <RecoilRoot>
        <ContactForm
          isEdit={false}
          closeModal={closeModalFn}
          modifyId={""}
          tableData={""}
        />
      </RecoilRoot>
    );
    const firstName = screen.getByLabelText('first-name-input');
    const firstNameInput = within(firstName).getByRole('textbox');

    userEvent.type(firstNameInput, '123abc');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Please enter a valid first name')).toBeInTheDocument();
    userEvent.clear(firstNameInput);
    userEvent.type(firstNameInput, 'Peter');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.queryByText('Please enter a valid first name')).toBeNull();
  });

  test('last name input validation', async () => {
    const closeModalFn = jest.fn();
    render(
      <RecoilRoot>
        <ContactForm
          isEdit={false}
          closeModal={closeModalFn}
          modifyId={""}
          tableData={""}
        />
      </RecoilRoot>
    );
    const lastName = screen.getByLabelText('last-name-input');
    const lastNameInput = within(lastName).getByRole('textbox');

    userEvent.type(lastNameInput, '?abc');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Please enter a valid last name')).toBeInTheDocument();
    userEvent.clear(lastNameInput);
    userEvent.type(lastNameInput, 'Peterson');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.queryByText('Please enter a valid last name')).toBeNull();
  });

  test('street input validation', async () => {
    const closeModalFn = jest.fn();
    render(
      <RecoilRoot>
        <ContactForm
          isEdit={false}
          closeModal={closeModalFn}
          modifyId={""}
          tableData={""}
        />
      </RecoilRoot>
    );
    const street = screen.getByLabelText('street-input');
    const streetInput = within(street).getByRole('textbox');

    userEvent.type(streetInput, 'park ave 456');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Please enter a valid street (numbers followed by street name)')).toBeInTheDocument();
    userEvent.clear(streetInput);
    userEvent.type(streetInput, '999 oakland rd.');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.queryByText('Please enter a valid street (numbers followed by street name)')).toBeNull();
  });

  test('city input validation', async () => {
    const closeModalFn = jest.fn();
    render(
      <RecoilRoot>
        <ContactForm
          isEdit={false}
          closeModal={closeModalFn}
          modifyId={""}
          tableData={""}
        />
      </RecoilRoot>
    );
    const cityName = screen.getByLabelText('city-input');
    const cityNameInput = within(cityName).getByRole('textbox');

    userEvent.type(cityNameInput, 'san 4rty');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Please enter a valid city')).toBeInTheDocument();
    userEvent.clear(cityNameInput);
    userEvent.type(cityNameInput, 'San Jose');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.queryByText('Please enter a valid city')).toBeNull();
  });

  test('zip input validation', async () => {
    const closeModalFn = jest.fn();
    render(
      <RecoilRoot>
        <ContactForm
          isEdit={false}
          closeModal={closeModalFn}
          modifyId={""}
          tableData={""}
        />
      </RecoilRoot>
    );
    const zip = screen.getByLabelText('zip-input');
    const zipInput = within(zip).getByRole('textbox');

    userEvent.type(zipInput, 'abc');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Please enter a 5 digit zip code')).toBeInTheDocument();
    userEvent.clear(zipInput);
    userEvent.type(zipInput, '1234');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Please enter a 5 digit zip code')).toBeInTheDocument();
    userEvent.clear(zipInput);
    userEvent.type(zipInput, '12340');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.queryByText('Please enter a 5 digit zip code')).toBeNull();
  });

  test('phone input validation', async () => {
    const closeModalFn = jest.fn();
    render(
      <RecoilRoot>
        <ContactForm
          isEdit={false}
          closeModal={closeModalFn}
          modifyId={""}
          tableData={""}
        />
      </RecoilRoot>
    );
    const phone = screen.getByLabelText('phone-input');
    const phoneInput = within(phone).getByRole('textbox');

    userEvent.type(phoneInput, '12345');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
    userEvent.clear(phoneInput);
    userEvent.type(phoneInput, '5551234567');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.queryByText('Please enter a valid phone number')).toBeNull();
  });

  test('email input validation', async () => {
    const closeModalFn = jest.fn();
    render(
      <RecoilRoot>
        <ContactForm
          isEdit={false}
          closeModal={closeModalFn}
          modifyId={""}
          tableData={""}
        />
      </RecoilRoot>
    );
    const email = screen.getByLabelText('email-input');
    const emailInput = within(email).getByRole('textbox');

    userEvent.type(emailInput, 'email.com');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'abc@yahoo.co');
    userEvent.click(screen.getByText('Submit'));
    expect(screen.queryByText('Please enter a valid email')).toBeNull();
  });

  test('edit contact form has values', () => {
    const closeModalFn = jest.fn();
    render(
      <RecoilRoot>
        <ContactForm
          isEdit={true}
          closeModal={closeModalFn}
          modifyId={testTableDataArray[0].id}
          tableData={testTableDataArray}
        />
      </RecoilRoot>
    );
    const firstName = screen.getByLabelText('first-name-input');
    const firstNameInput = within(firstName).getByRole('textbox');
    const lastName = screen.getByLabelText('last-name-input');
    const lastNameInput = within(lastName).getByRole('textbox');
    const street = screen.getByLabelText('street-input');
    const streetInput = within(street).getByRole('textbox');
    const city = screen.getByLabelText('city-input');
    const cityInput = within(city).getByRole('textbox');
    const zip = screen.getByLabelText('zip-input');
    const zipInput = within(zip).getByRole('textbox');
    const phone = screen.getByLabelText('phone-input');
    const phoneInput = within(phone).getByRole('textbox');
    const email = screen.getByLabelText('email-input');
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

    userEvent.click(screen.getByText('Submit'));
    expect(closeModalFn).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByText('Cancel'));
    expect(closeModalFn).toHaveBeenCalledTimes(2);
  });
});
