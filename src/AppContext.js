import React, { useState } from 'react';
import mockData from './mockData';

//initially sort mock data by first name
const sortData = mockData.sort((a, b) => {
  const nameA = a.firstName
  const nameB = b.firstName
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [contactArray, setContactArray] = useState(sortData);
  const [resetTableSort, setResetTableSort] = useState(false);

  const addContact = (contact) => {
    setResetTableSort(true);
    setContactArray([...contactArray, contact]);
  };

  const editContact = (tableData, editedContact) => {
    let modifiedContactArray = [...tableData];
    const editIndex = modifiedContactArray.findIndex( contact => contact.id === editedContact.id);
    modifiedContactArray[editIndex] = editedContact;
    // resetting table sort even though it may not be necessary (demo project)
    // cannot guarantee table data is still sorted
    setResetTableSort(true);
    setContactArray(modifiedContactArray);
  };

  const deleteContact = (tableData, deleteId) => {
    let modifiedContactArray = [...tableData];
    const deleteIndex = modifiedContactArray.findIndex( contact => contact.id === deleteId);
    modifiedContactArray.splice(deleteIndex, 1);
    setContactArray(modifiedContactArray);
  };

  const noResetTableSort = () => {
    setResetTableSort(false);
  }

  return (
    <AppContext.Provider value={{
      contactArray,
      resetTableSort,
      addContact,
      editContact,
      deleteContact,
      noResetTableSort
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;