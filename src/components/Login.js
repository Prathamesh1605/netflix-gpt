import React, { use, useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/vaildate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { Avatar } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useSelector((store) => store.user);
  const email = useRef(null);
  const password = useRef(null);
  const fName = useRef(null);
  const lName = useRef(null);
  const dispatch = useDispatch();

  const togggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleClick = () => {
    const response = validateData(email.current.value, password.current.value);
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
          updateProfile(user, {
            displayName: fName.current.value,
            photoURL: Avatar,
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
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
        <img src={user?.photoURL} alt="background-image"></img>
      </div>
      <div className=" text-white w-3/12 my-48 absolute p-12 bg-black z-10 mx-auto left-0 right-0 bg-opacity-80">
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
      </div>
    </div>
  );
};

export default Login;
