import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth.context';

const LoginPage = () => {
  const history = useHistory();
  const [login, setLogin] = useState();
  const { user, setUser } = useContext(AuthContext);

  const signinHandler = (e) => {
    e.preventDefault();
    signin();
  }

  const signin = () => {
    fetch(`/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    })
      .then(response => response.json())
      .then(data => {
        console.log("signin: ", user);
        setUser(data);
        history.push({
          pathname: `/search-spots`
        });
      })
  }
  return (
    <div className="login-page text-center">
      <main className="form-signin">
        <form onSubmit={signinHandler}>
          <img className="login-logo" src="/assets/scratch-logo.png" alt="" width="200" height="120" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />

          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />

          </div>
          <div className="checkbox mb-3">
            {/* Sign In with Google */}
            <div className="col-sm-4">
              <div className="card">
                <div className="card-body">
                  {/* href makes a request to the following path-->change as needed */}
                  <a className="btn btn-block btn-social btn-google" href="auth/google" role="button">
                    <i className="fab fa-google"></i>
                    {/* Sign In with Google */}
                  </a>
                </div>
              </div>
            </div>

            <Link to='/signup'>Create Account</Link>
            <div className="col-sm-4">
              <div className="card">
                {/* Sign Up with Google */}
                {/* href makes a request to the following path-->change as needed */}
                <a className="btn btn-block btn-social btn-google" href="auth/google" role="button">
                  <i className="fab fa-google"></i>
                  {/* Sign Up with Google */}
                </a>
            </div>
          </div>
          </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
        </form>
      </main>
    </div >
  );
};
export default LoginPage;

