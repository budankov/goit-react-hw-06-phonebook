import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import ContactFilter from 'components/ContactFilter/ContactFilter';

import styles from './Phonebook.module.scss';

const Phonebook = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerBcg}>
        <div className={styles.contactBook}>
          <h1 className={styles.title}>Phonebook</h1>
          <ContactForm />
          <h2 className={styles.subTitle}>Contacts</h2>
          <ContactFilter />
          <ContactList />
        </div>
      </div>
    </div>
  );
};

export default Phonebook;
