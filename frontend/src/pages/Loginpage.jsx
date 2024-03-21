import { NavLink } from "react-router-dom";
import loginImage from "../assets/loginimg.jpg";
import { useState } from "react";
import RegisterPage from "./Registerpage";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [signUp, setSignup] = useState(false);
  const [loginIn, setLogin] = useState(true);

  const handleSignUp = () => {
    setSignup(true);
    setLogin(false);
    // toast.success("Please register to continue");
  };

  const handleLogin = () => {
    setSignup(false);
    setLogin(true);
  };

  const authSvc = new AuthService();
  const navigate = useNavigate();
  const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: null,
      password: null,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        let response = await authSvc.login(values);
        if (response.status) {
          let formattedData = {
            id: response.result.data._id,
            name: response.result.data.name,
            email: response.result.data.email,
          };

          localStorage.setItem(
            "accessToken",
            response.result.token.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            response.result.token.refreshToken
          );
          localStorage.setItem("user", JSON.stringify(formattedData));
          let user = JSON.parse(localStorage.getItem("user"));
          toast.success(`Welcome ${user.name}`);
          navigate("/go");
        } else {
          toast.warning("Credentials does not match");
        }

        // console.log(response)
      } catch (axiosErrorResponse) {
        console.log(axiosErrorResponse);
        toast.error("Credentials does not match");
      }
    },
  });

  const isLoggedIn = () => {
    return localStorage.getItem("user") !== null;
  };

  const Logout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged Out Successfully");
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
                    name="email"
                    onChange={formik.handleChange}
                  />
                  <span className="text-red-800">{formik.errors?.email}</span>
                  <input
                    className="h-9 w-2/3 ps-5 mt-7 bg-white border rounded-xl text-black"
                    type="text"
                    placeholder="Enter your password"
                    name="password"
                    onChange={formik.handleChange}
                  />
                  <span className="text-red-800">
                    {formik.errors?.password}
                  </span>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    onClick={formik.handleSubmit}
                    className="w-1/3  mt-7  bg-gray-800 p-2 pe-7 rounded-lg capitalize font-serif text-white text-md hover:bg-gray-600"
                  >
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
              <RegisterPage submitRegister={handleLogin} />
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
