import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .trim()
    .max(12, 'must be max 12 characters long')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces.'
    ),
  number: yup
    .string()
    .required()
    .trim()
    .max(12, 'must be max 12 characters long')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});