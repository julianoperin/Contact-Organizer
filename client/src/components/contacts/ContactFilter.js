import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef("");

  const { filtered, filterContacts, clearFilter } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, [filtered]);

  const handleChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <h2 className="summary">Contacts</h2>

      <input
        type="text"
        ref={text}
        placeholder="Filter Contacts..."
        onChange={handleChange}
      />
    </form>
  );
};

export default ContactFilter;
