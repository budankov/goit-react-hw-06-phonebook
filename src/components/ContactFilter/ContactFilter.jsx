import PropTypes from 'prop-types';
import styles from './ContactFilter.module.scss';

const ContactFilter = ({ value, changeFilter }) => {
  return (
    <label className={styles.filterTitle}>
      Find contacts by name
      <input
        className={styles.filterInput}
        onChange={changeFilter}
        type="text"
        value={value}
      ></input>
    </label>
  );
};
export default ContactFilter;

ContactFilter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
