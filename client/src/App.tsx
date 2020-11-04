import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home isLoggedIn={isLoggedIn} loading={loading} />
          </Route>
          <Route path='/login'>
            <Login login={login} isLoggedIn={isLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
