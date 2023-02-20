import { useState } from 'react';
import PropTypes from 'prop-types';

import initialState from './initialState';

import styles from './contactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({...initialState});

  const onFormSubmit = evt => {
    evt.preventDefault();
    onSubmit({ name, number });
    setState({...initialState});
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const { name, number } = state;

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <div className={styles.phonebook}>
        <h2 className={styles.title}>Phonebook</h2>

        <div className={styles.input_wrepper}>
          <label className={styles.contact_label} htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            onChange={onInputChange}
            className={styles.contact_input}
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>

        <div className={styles.input_wrepper}>
          <label className={styles.contact_label} htmlFor="number">
            Tel.:
          </label>
          <input
            id="number"
            onChange={onInputChange}
            className={styles.contact_input}
            type="tel"
            placeholder="Enter phone number"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button className={styles.phonebook_btn}> Add contact </button>
      </div>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
