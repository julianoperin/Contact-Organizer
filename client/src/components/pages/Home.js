import React from "react";
import Contacts from "../contacts/Contacts";

const Home = () => {
  return (
    <div className="grid-2">
      <div>{/* {Contact form} */}</div>
      <div>
        <h1>home</h1>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
