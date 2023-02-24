import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import styles from './App.module.scss';

import contacstList from './data/contactsList';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('my-contacts')) ?? contacstList
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase().trim();
    const normalizedNumber = number.toString().trim();
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName || number === normalizedNumber
      );
    });
    return result;
  };
  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      return Notify.failure(
        'The contact already exists, please add a new contact'
      );
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevContacts];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilterContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });
    return result;
  };

  const visibleContact = getFilterContacts();
  const isContact = Boolean(visibleContact);

  return (
    <div className={styles.container}>
      <div className={styles.containerBcg}>
        <div className={styles.contactBook}>
          <h1 className={styles.title}>Phonebook</h1>
          <ContactForm onSubmit={addContact} />
          <h2 className={styles.subTitle}>Contacts</h2>
          <Filter value={filter} changeFilter={changeFilter} />
          {isContact && (
            <ContactList
              contact={visibleContact}
              deleteContact={deleteContact}
            />
          )}
          {!isContact && <p className={styles.noContact}>No contact in list</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
