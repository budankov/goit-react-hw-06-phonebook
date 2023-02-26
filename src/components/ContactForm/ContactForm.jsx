import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import { Formik, Form, Field } from 'formik';
import { userSchema } from './Yup';

import styles from './ContactForm.module.scss';

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = ({ name, number }, { resetForm }) => {
    if (
      contacts.find(option => option.name.toLowerCase() === name.toLowerCase())
    ) {
      return Notify.failure(`${name} is already in contacts`);
    }
    dispatch(addContact(name, number));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label>
          <p>Name</p>
          <Field type="text" name="name" />
        </label>
        <label>
          <p>Number</p>
          <Field type="tel" name="number" />
        </label>
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#4caf50',
            '&:hover': { backgroundColor: '#29972c' },
          }}
          startIcon={<AddIcon />}
        >
          Add contact
        </Button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
