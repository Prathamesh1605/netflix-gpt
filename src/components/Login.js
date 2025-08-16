import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/vaildate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const fName = useRef(null);
  const lName = useRef(null);
  const navigate = useNavigate();

  const togggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleClick = () => {
    const response = validateData(email.current.value, password.current.value);
    console.log(response);
    setErrorMessage(response);
    if (response) return;

    //SIgnIn and SignUP logic
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7d2359a4-434f-4efa-9ff3-e9d38a8bde7f/web/IN-en-20250707-TRIFECTA-perspective_4faa9280-a2c5-4e07-aafc-a45ce43fea09_large.jpg"
          alt="background-image"
        ></img>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" text-white w-3/12 my-48 absolute p-12 bg-black z-10 mx-auto left-0 right-0 bg-opacity-80"
      >
        <h1 className="py-4 font-bold text-3xl">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn ? (
          <input
            ref={fName}
            className="p-2 my-4 w-full bg-gray-700 rounded-lg"
            type="text"
            placeholder="First Name"
          ></input>
        ) : (
          <></>
        )}
        {!isSignIn ? (
          <input
            ref={lName}
            className="p-2 my-4 w-full bg-gray-700 rounded-lg"
            type="text"
            placeholder="Last Name"
          ></input>
        ) : (
          <></>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg"
        />
        <p className="text-red-600">{errorMessage}</p>
        <button
          className="p-4 bg-red-700 my-6 w-full rounded-sm text-lg font-medium hover:bg-red-950"
          onClick={handleClick}
        >
          Submit
        </button>
        <p className="font-normal cursor-pointer" onClick={togggleSignInForm}>
          {isSignIn
            ? "New to Netflix? Sign Up Now..."
            : "Already Registered? Login Now... "}
        </p>
      </form>
    </div>
  );
};

export default Login;
