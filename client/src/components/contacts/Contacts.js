import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contact = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;

  return (
    <>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </>
  );
};

export default Contact;
