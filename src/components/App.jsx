import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactFilter from './ContactsFilter/ContactsFilter';
import ContactList from './ContactList/ContactList';

// import contactsArray from './contactsArray';

import styles from './ContactForm/contactForm.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem("My-Contacts"));
    return contacts?.length ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  const isDublicateContact = (name, number) => {
    const normalizedName = name.toLowerCase();
    const phoneNumber = number;
    const contact = contacts.find(({ name, number }) => {
      return name.toLowerCase() === normalizedName || number === phoneNumber;
    });
    return Boolean(contact);
  };

  useEffect(() => {
    localStorage.setItem('My-Contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (isDublicateContact(name, number)) {
      return alert(
        `The contact "${name}" or number "${number}" alredy exist your contact list. Please, check name or number of contact and try again`
      );
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [...[newContact], ...prevContacts];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) || number.includes(filter)
      );
    });
    return result;
  };

  const onFilterInputChange = ({ target }) => setFilter(target.value);

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.wrapper}>
      <ContactForm onSubmit={addContact} />

      <div className={styles.contacts}>
        <h2 className={styles.title}>Contacts:</h2>
        <ContactFilter onInputChange={onFilterInputChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
};

export default App;
/*
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  */
