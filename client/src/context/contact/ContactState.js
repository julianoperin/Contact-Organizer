import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        type: "personal",
        id: "1",
        name: "Tony Smith",
        email: "tony@gmail.com",
        phone: "111-555-1111",
      },
      {
        type: "professional",
        id: "2",
        name: "Sara Smith",
        email: "sara@gmail.com",
        phone: "555-555-5555",
      },
      {
        type: "professional",
        id: "3",
        name: "Danny Williams",
        email: "sara@gmail.com",
        phone: "222-222-2222",
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //! Add Contact

  //! Delete Contact

  //! Set Current Contact

  //! Clear Current Contact

  //! Update Contact

  //! Filter Contacts

  //! Clear Filter

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
