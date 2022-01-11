import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const { login } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    const onFormSubmit = async (data) => {
        try {
            const result = await axios.post('http://localhost:3000/signin', {
                email: data.email,
                password: data.password
            })

            console.log(result);
            login(result.data.accessToken);

        } catch (e) {
            console.error(e.response);
        }

        console.log(data);

    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit(onFormSubmit)}>
          <label htmlFor="email-input">Email</label>
          <input
              type='text'
              id='email-input'
              {...register('email')}
          />

          <label htmlFor="password-input">Wachtwoord</label>
          <input
              type='password'
              id='password-input'
              {...register('password')}
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