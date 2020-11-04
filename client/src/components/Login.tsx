import React from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
  login: () => Promise<void>;

  isLoggedIn: boolean;
};

function Login({ login, isLoggedIn }: Props) {
  if (isLoggedIn) return <Redirect to='/' />;

  return (
    <div>
      <p>Email</p>
      <input type='text' value='duy@gmail.com' />

      <p>Password</p>
      <input type='text' value='nguyenduy' />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
