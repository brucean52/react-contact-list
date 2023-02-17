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
  }
]

export const mockContextValues = {
  contactArray: testTableDataArray,
  resetTableSort: false,
  addContact: jest.fn(),
  editContact: jest.fn(),
  deleteContact: jest.fn(),
  noResetTableSort: jest.fn()
}