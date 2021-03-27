import React, { useContext, useEffect, useState } from "react";
import ContactContext from "../../context/contact/contactContext";

const Info = () => {
  const { contacts } = useContext(ContactContext);

  const [total, setTotal] = useState(0);
  const [noDiet, setNoDiet] = useState(0);
  const [vegetarian, setVegetarian] = useState(0);
  const [vegan, setVegan] = useState(0);

  const totalTypes = (item, itemTwo) =>
    itemTwo.filter((element) => element.type === item).length;

  useEffect(() => {
    if (contacts !== null) {
      setTotal(contacts.length);
      setNoDiet(totalTypes("no-Diet", contacts));
      setVegetarian(totalTypes("vegetarian", contacts));
      setVegan(totalTypes("vegan", contacts));
    }
  }, [contacts]);

  return (
    <>
      <h2 className="summary-total">Summary</h2>

      <div className="table">
        <table>
          <tbody>
            <tr>
              <th>No Diet</th>
              <th>Vegetarian</th>
              <th>Vegan</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>{noDiet}</td>
              <td>{vegetarian}</td>
              <td>{vegan}</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Info;
