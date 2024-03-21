import { NavLink } from "react-router-dom";
import loginImage from "../assets/loginimg.jpg";
import { useState } from "react";
import RegisterPage from "./Registerpage";

const LoginPage = () => {
  const [signUp, setSignup] = useState(false);
  const [loginIn, setLogin] = useState(true);

  const handleSignUp = () => {
    setSignup(true);
    setLogin(false);
  };

  const handleLogin = () => {
    setSignup(false);
    setLogin(true);
  };

  return (
    <>
      <div className="h-screen w-screen bg-gray-400 pt-28">
        <div className="bg-gray-300 h-3/4 w-4/5 ms-20 flex rounded-3xl">
          <div className="w-1/2">
            {loginIn ? (
              <div>
                <h1 className="text-center text-3xl font-serif mt-6">Login</h1>
                <hr className="mt-2 border-black" />
                <div className="flex flex-col justify-center items-center mt-5">
                  <input
                    className="h-9 w-2/3 ps-5 mt-7 bg-white border rounded-xl text-black"
                    type="text"
                    placeholder="Enter your email"
                  />
                  <input
                    className="h-9 w-2/3 ps-5 mt-7 bg-white border rounded-xl text-black"
                    type="text"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <button className="w-1/3  mt-7  bg-gray-800 p-2 pe-7 rounded-lg capitalize font-serif text-white text-md hover:bg-gray-600">
                    Sign In
                  </button>
                </div>
                <div className="flex mt-7 items-center justify-center">
                  <hr className=" border-black w-40 me-5" />
                  <span>or</span>
                  <hr className=" border-black w-40 ms-5" />
                </div>
                <div className="font-serif text-center mt-4">
                  Don't have an account ?{" "}
                  <span
                    onClick={handleSignUp}
                    className="text-green-600 cursor-pointer underline "
                  >
                    Sign up
                  </span>
                </div>
              </div>
            ) : (
              <img
                src={loginImage}
                alt=""
                className="w-full h-full rounded-s-3xl"
              />
            )}
          </div>
          <div className="w-1/2">
            {signUp ? (
              <div>
                <h1 className="text-center text-3xl font-serif mt-6">
                  Sign Up
                </h1>
                <hr className="mt-2 border-black" />
                <div className="flex flex-col ms-7 mt-5 font-serif">
                  <label>Enter your name</label>
                  <input
                    className="h-9 mt-1 mb-3 w-2/3 ps-5 bg-white border rounded-md text-black"
                    type="text"
                    placeholder="Enter your full name"
                  />
                  <label>Enter your email</label>
                  <input
                    className="h-9 mt-1 mb-3 w-2/3 ps-5 bg-white border rounded-md text-black"
                    type="text"
                    placeholder="Enter your email"
                  />
                  <label>Enter your password</label>
                  <input
                    className="h-9 mt-1 mb-3 w-2/3 ps-5  bg-white border rounded-md text-black"
                    type="text"
                    placeholder="Enter your password"
                  />
                  <label className="mt-1" for="file">
                    Upload your profile photo
                  </label>
                  <input type="file" placeholder="upload" />
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleLogin}
                    className="w-1/3 mt-2  bg-gray-800 p-2 pe-7 rounded-lg capitalize font-serif text-white text-md hover:bg-gray-600"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            ) : (
              <img
                src={loginImage}
                alt=""
                className="w-full h-full rounded-e-3xl"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
