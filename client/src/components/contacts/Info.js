import React, { useContext, useEffect, useState } from "react";
import ContactContext from "../../context/contact/contactContext";

const Info = () => {
  const { contacts } = useContext(ContactContext);

  const [total, setTotal] = useState(0);
  const [personal, setPersonal] = useState(0);
  const [professional, setProfessional] = useState(0);

  const totalTypes = (item, itemTwo) =>
    itemTwo.filter((element) => element.type === item).length;

  useEffect(() => {
    if (contacts !== null) {
      setTotal(contacts.length);
      setPersonal(totalTypes("personal", contacts));
      setProfessional(totalTypes("professional", contacts));
    }
  }, [contacts]);

  return (
    <>
      <h2 className="summary-total">Summary</h2>
      <div className="table">
        <table>
          <tbody>
            <tr>
              <th>Personal</th>
              <th>Professional</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>{personal}</td>
              <td>{professional}</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Info;
