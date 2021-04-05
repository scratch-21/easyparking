import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LoginPage from './pages/Login.page';
import SignUpPage from './pages/SignUp.page';
import SearchSpots from './pages/SearchSpots.page';
import DetailPage from './pages/DetailSpot.page';
import { AuthContext } from './contexts/Auth.context';

function App() {
  const [user, setUser] = useState(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <div>
      <Router>
        <AuthContext.Provider value={providerUser}>
          <Route component={LoginPage} exact path="/" />
          <Route component={SignUpPage} exact path="/signup" />
          <Route path='/search-spots'>
            <SearchSpots />
          </Route>
          <Route path='/test'>
            <DetailPage />
          </Route>
          <ul>
            <li>
              <Link to='/my-profile'>Profile</Link>
            </li>
            <li>
              <Link to='/signup'>signup</Link>
            </li>
            <li>
              <Link to='/test'>test</Link>
            </li>
          </ul>
          {/* <p>I'm in React</p> */}
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;