import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LoginPage from './pages/Login.page';
import SignUpPage from './pages/SignUp.page';
import SearchSpots from './pages/SearchSpots.page';
import ProfilePage from './pages/Profile.page'
import DetailPage from './pages/DetailSpot.page';
import AdminPage from './pages/Admin.page';
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
          <Route component={ProfilePage} exact path="/my-profile" />
          <Route component={DetailPage} exact path="/spot-detail" />
          <Route component={AdminPage} exact path="/admin" />
          <Route path='/search-spots'>
            <SearchSpots />
          </Route>

          {/* <ul>
            <li>
              <Link to='/test'>Map</Link>
            </li>
          </ul> */}
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;