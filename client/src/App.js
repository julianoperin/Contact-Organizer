import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import ContactState from "./context/contact/ContactState";

//! Components
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Budget from "./components/pages/Budget";

const App = () => {
  return (
    <ContactState>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/budget" component={Budget} />
            </Switch>
          </div>
        </>
      </Router>
    </ContactState>
  );
};

export default App;
