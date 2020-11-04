import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      const data = await axios.post('http://localhost:5000/api/auth/login', {
        email: 'duy@gmail.com',
        password: 'nguyenduy',
      });

      const token = data.data.token;
      localStorage.setItem('token', token);
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
    }
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const getUserData = async () => {
    try {
      const email = await axios.get(
        'http://localhost:5000/api/auth/user/data',
        axiosConfig
      );
      console.log(email);
      setLoggedIn(true);
      setLoading(false);
    } catch (error) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='App'>
      <p>Email</p>
      <input
        type='text'
        onChange={e => setEmail(e.target.value)}
        value='duy@gmail.com'
      />

      <p>Password</p>
      <input
        type='text'
        onChange={e => setPassword(e.target.value)}
        value='nguyenduy'
      />

      <button onClick={login}>Login</button>

      {isLoggedIn ? <p>I am logged in</p> : <p>I am logged out</p>}
    </div>
  );
}

export default App;
