import React, { useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contact = () => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;

  console.log(contacts);

  return (
    <>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </>
  );
};

export default Contact;
