import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LoginPage from './pages/Login.page';
import SignUpPage from './pages/SignUp.page';

function App() {
  return(
    <div>
      <Router>
        <Route component={LoginPage} exact path="/" />
        <Route component={SignUpPage} exact path="/signup" />
        <ul>
              <li>
                <Link to='/my-profile'>Profile</Link>
              </li>
              <li>
                <Link to='/signup'>signup</Link>
              </li>
            </ul>
        {/* <p>I'm in React</p> */}
      </Router>
    </div>
  );
}

export default App;