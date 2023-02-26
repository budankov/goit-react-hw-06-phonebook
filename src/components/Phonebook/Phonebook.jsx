import { useSelector, useDispatch } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import ContactFilter from 'components/ContactFilter/ContactFilter';

import { addContact, deleteContact } from 'redux/contacts/contacts-slice';
import { setFilter } from '../../redux/filter/filter-slice';
import { getFilter } from '../../redux/filter/filter-selectors';
import {
  getAllContacts,
  getFilteredContacts,
} from '../../redux/contacts/contacts-selectors';

import styles from './Phonebook.module.scss';

const Phonebook = () => {
  const dispatch = useDispatch();
  const allContacts = useSelector(getAllContacts);
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

  console.log(allContacts);

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase().trim();
    const normalizedNumber = number.toString().trim();
    const result = allContacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName || number === normalizedNumber
      );
    });
    return Boolean(result);
  };

  const handleAddContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      return Notify.failure(
        'The contact already exists, please add a new contact'
      );
    }
    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const changeFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isContact = Boolean(filteredContacts);

  return (
    <div className={styles.container}>
      <div className={styles.containerBcg}>
        <div className={styles.contactBook}>
          <h1 className={styles.title}>Phonebook</h1>
          <ContactForm onSubmit={handleAddContact} />
          <h2 className={styles.subTitle}>Contacts</h2>
          <ContactFilter value={filter} changeFilter={changeFilter} />
          {isContact && (
            <ContactList
              items={filteredContacts}
              deleteContact={handleDeleteContact}
            />
          )}
          {!isContact && <p className={styles.noContact}>No contact in list</p>}
        </div>
      </div>
    </div>
  );
};

export default Phonebook;
