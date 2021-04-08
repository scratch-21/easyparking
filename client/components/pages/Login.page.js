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

            {/* href makes a request to the following path-->change as needed */}
            <div className="google-btn">
              <a className="btn btn-danger" href="auth/google" role="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
                &nbsp; 
                Sign In with Google 
              </a>
            </div>



            <Link to='/signup'>Create Account</Link>

          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
        </form>
      </main>
    </div >
  );
};
export default LoginPage;

