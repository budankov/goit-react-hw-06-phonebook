import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

import { ContactListItem } from 'components/ContactListItem/ContactListItem';

import styles from './ContactList.module.scss';

const getVisibleContacts = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = getVisibleContacts(contacts, filter);

  return (
    <div className={styles.contactListContaoner}>
      <ul className={styles.contactList}>
        {contacts.length === 0
          ? Notify.failure('Contacts list is empty!')
          : visibleContacts.map(({ id, name, number }) => (
              <ContactListItem key={id} id={id} name={name} number={number} />
            ))}
      </ul>
    </div>
  );
};
export default ContactList;
