import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";

function SignUp() {
    const history = useHistory();
    const { register, handleSubmit } = useForm();



    const handleRegister = async (data) => {
        try {
            await axios.post('http://localhost:3000/register', {
                email: data.email,
                password: data.password,
                username: data.username
            })

            history.push('/signin');
        } catch (e) {
            console.log(e.response);
        }
    }

  return (
    <>
      <h1>Registreren</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?
      </p>

      <form onSubmit={handleSubmit(handleRegister)}>
          <label htmlFor="username-input">Gebruikersnaam</label>
          <input
              type='text'
              id='username-input'
              {...register('username')}
          />

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

          <button>
              Registreren
          </button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;