import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function SignIn() {
    const { signIn } = useContext(AuthContext);

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={signIn}>
          <label htmlFor="email-input">Email</label>
          <input
              type='text'
              id='email-input'
          />

          <label htmlFor="password-input">Wachtwoord</label>
          <input
              type='password'
              id='password-input'
          />

        <button
        >
            Inloggen
        </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;