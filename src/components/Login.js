import React from "react";
import Header from "./Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/7d2359a4-434f-4efa-9ff3-e9d38a8bde7f/web/IN-en-20250707-TRIFECTA-perspective_4faa9280-a2c5-4e07-aafc-a45ce43fea09_large.jpg"
          alt="background-image"
        ></img>
      </div>
      <form className=" text-white w-3/12 my-48 absolute p-12 bg-black z-10 mx-auto left-0 right-0 bg-opacity-75">
        <h1 className="py-4 font-bold text-3xl">Sign In</h1>
        <input
          type="text"
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg"
        />
        <button className="p-4 bg-red-700 my-6 w-full rounded-sm text-lg font-medium hover:bg-red-950">
          Submit
        </button>
        <span className="font-normal">
          New to Netflix?
          <a className="font-semibold cursor-pointer">Sign up now</a>
        </span>
      </form>
    </div>
  );
};

export default Login;
