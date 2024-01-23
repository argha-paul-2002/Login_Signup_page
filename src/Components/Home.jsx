import React from "react";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { database } from './Firebase';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(database).then(() => {
      localStorage.clear();
      navigate('/');
    }).catch((error) => {
      // Handle any errors here
      console.error('Logout failed', error);
    });
  };

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const photo = localStorage.getItem("photo");

  return (
    <div>
      <h1>Home Page</h1>
      {name && name !== "null" && <h1>{name}</h1>}
      {email && email !== "null" && <h1>{email}</h1>}
      {photo && photo !== "null" && <img src={photo} alt="Profile" />}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
