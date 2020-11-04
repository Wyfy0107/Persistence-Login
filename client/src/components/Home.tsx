import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
  isLoggedIn: boolean;
  loading: boolean;
};

function Home({ isLoggedIn, loading }: Props) {
  useEffect(() => console.log(loading), [loading]);
  if (loading) return <p>Loading...</p>;
  if (!isLoggedIn) return <Redirect to='/login' />;

  return <div>hello{isLoggedIn && <p>I am logged in</p>}</div>;
}

export default Home;
