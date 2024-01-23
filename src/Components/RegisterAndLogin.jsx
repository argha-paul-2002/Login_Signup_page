import React, { useState, useEffect } from "react";
import { database,provider } from "./Firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {signInWithPopup} from "firebase/auth";
import '../App.css';
import './RegisterAndLogin.css';
import swal from 'sweetalert';


function RegisterAndLogin() {
    const [login, setLogin] = useState(false);
    const [value,setValue] = useState(localStorage.getItem('email'));

  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type == "signup") {
      createUserWithEmailAndPassword(database, email, password)
        .then((result) => {

            const name = result.user.displayName;
            const email = result.user.email;
            const photo = result.user.photoURL;

            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('photo', photo);

          history("/home");
        })
        .catch((err) => {
            swal({
              title: "Error!",
              text: `Error Code: ${err.code}`,
              icon: "error",
              button: "Ok",
            });            
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((result) => {
        //   console.log(data, "authData");
            const name = result.user.displayName;
            const email = result.user.email;
            const photo = result.user.photoURL;

            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('photo', photo);
          history("/home");
        })
        .catch((err) => {
            swal({
                title: "Error!",
                text: `Error Code: ${err.code}`,
                icon: "error",
                button: "Ok",
              });   
        });
    }
  };

  const handleClick = () => {
    signInWithPopup(database, provider).then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const photo = result.user.photoURL;

        setValue(email);  

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('photo', photo);
        history('/home');

    })
    .catch((error) => {
        console.log(error);
    });
};

useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
        setValue(userEmail);
        history('/home'); // Redirect if already logged in
    }
}, [history]);

  const handleReset = ()=>{
    history("/reset");
  }
  return (
    <div className="App">
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md px-6 py-8 bg-white shadow-md overflow-hidden rounded-lg">
            <div className="flex justify-around mb-6">
                <div
                className={`font-semibold cursor-pointer ${!login && 'text-blue-600'}`}
                onClick={() => setLogin(false)}
                >
                Sign Up
                </div>
                <div
                className={`font-semibold cursor-pointer ${login && 'text-blue-600'}`}
                onClick={() => setLogin(true)}
                >
                Sign In
                </div>
            </div>
            <h1 className="text-2xl text-center mb-6">{login ? "Sign In" : "Sign Up"}</h1>
            <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
                <input className="w-full px-3 py-2 border border-gray-300 rounded mb-4" name="email" placeholder="Email" required />
                <input className="w-full px-3 py-2 border border-gray-300 rounded mb-4" name="password" type="password" required placeholder="Password" />
                <p className="text-blue-600 cursor-pointer mb-4" onClick={handleReset}>Forgot Password?</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">{login ? "Sign In" : "Sign Up"}</button>
            </form>
            {/* {!value && <button className="w-full bg-red-600 text-white py-2 rounded mt-4 hover:bg-red-700" onClick={handleClick}>Sign in with Google</button>} */}

            {!value && (
            <button className="w-full bg-white-300 text-black py-2 rounded mt-4 hover:bg-gray-200 flex items-center justify-center" onClick={handleClick}>
                    <svg className="h-5 w-5 mr-2" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
                Sign in with Google
            </button>
            )}

            </div>
        </div>
    </div>

  );
}
export default RegisterAndLogin;