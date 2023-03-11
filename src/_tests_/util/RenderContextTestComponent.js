import { useContext} from 'react';
import { AppContext } from '../../AppContext';
import { mockContactOne, editedMockContactOne } from './testData';

const RenderContextTestComponent = () => {
  const { 
    contactArray,
    resetTableSort,
    addContact,
    editContact,
    deleteContact,
    noResetTableSort
  } = useContext(AppContext);

  return (
    <div>
      <p aria-label="reset-table-sort-value">{resetTableSort.toString()}</p>
      {contactArray.map((contact, index) => {
        return (
          <div key={index}>
            <p arial-label={`id-${index}`}>{contact.id}</p>
            <p arial-label={`full-name-${index}`}>{contact.firstName} {contact.lastName}</p>
            <p arial-label={`street-${index}`}>{contact.street}</p>
            <p arial-label={`city-${index}`}>{contact.city}</p>
            <p arial-label={`state-${index}`}>{contact.state}</p>
            <p arial-label={`zip-${index}`}>{contact.zip}</p>
            <p arial-label={`email-${index}`}>{contact.email}</p>
            <p arial-label={`phone-${index}`}>{contact.phone}</p>
          </div>
        )
      })}
      <button
        aria-label="add-btn-mock-contact-one"
        onClick={() => addContact(mockContactOne)}
      >add mock contact</button>
      <button
        aria-label="edit-btn-mock-contact-one"
        onClick={() => editContact(contactArray, editedMockContactOne)}
      >edit mock contact</button>
      <button
        aria-label="delete-btn-mock-contact-one"
        onClick={() => deleteContact(contactArray, mockContactOne.id)}
      >delete mock contact</button>
      <button
        aria-label="reset-table-sort"
        onClick={() => noResetTableSort()}
      >reset table sort</button>
    </div>
  )
};

export default RenderContextTestComponent;