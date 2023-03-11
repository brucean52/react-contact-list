import mockData from "../../mockData"

export const testTableDataArray = [
  { 
    id: '8fec476e-45aa-87ab-87bb-ba717b3d81ab',
    firstName: 'Marcel',
    lastName: 'Baxter',
    street: '306 Kemper Lane',
    city: 'Clearfield',
    state: 'UT',
    zip: '84015',
    phone: '801-825-2691',
    email: 'hunter.baxter44@gmail.com'
  },
  { 
    id: '8fec476e-64cd-87ab-56ef-ba717b3d18cc',
    firstName: 'Isabella',
    lastName: 'Carr',
    street: '4218 Wescam Court',
    city: 'Reno',
    state: 'NV',
    zip: '89501',
    phone: '775-862-4408',
    email: 'isabella.carr98@yahoo.com'
  },
  { 
    id: '9fec476e-51ab-25dd-56ef-ba717b3d69de',
    firstName: 'Iris',
    lastName: 'Bond',
    street: '746 Coplin Avenue',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85012',
    phone: '602-532-6824',
    email: 'miss.iris04@gmail.com'
  },
  { 
    id: '9fef476e-32de-56ad-77ab-dc217b3d12ad',
    firstName: 'Joe',
    lastName: 'Brooks',
    street: '3954 West Side Avenue',
    city: 'Newark',
    state: 'NJ',
    zip: '07102',
    phone: '201-299-4115',
    email: 'jbrooks82967@example.org'
  },
]

export const mockContextValues = {
  contactArray: testTableDataArray,
  resetTableSort: false,
  addContact: jest.fn(),
  editContact: jest.fn(),
  deleteContact: jest.fn(),
  noResetTableSort: jest.fn()
}

export const mockContextFullContactArrayValues = {
  contactArray: mockData,
  resetTableSort: false,
  addContact: jest.fn(),
  editContact: jest.fn(),
  deleteContact: jest.fn(),
  noResetTableSort: jest.fn()
}

export const mockContactOne = {
  id: 'abc123',
  firstName: 'CJ',
  lastName: 'Summers',
  street: '6541 Ocean Drive',
  city: 'San Diego',
  state: 'CA',
  zip: '92111',
  phone: '619-994-9981',
  email: 'csummers93@yahoo.com'
}

export const editedMockContactOne = {
  id: 'abc123',
  firstName: 'Carlton',
  lastName: 'Summers',
  street: '5241 Winton Ave',
  city: 'Hayward',
  state: 'CA',
  zip: '94544',
  phone: '619-994-9981',
  email: 'csummers93@yahoo.com'
}