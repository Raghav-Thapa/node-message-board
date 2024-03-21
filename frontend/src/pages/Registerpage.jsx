import userImg from "../assets/user.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterPage = ({ submitRegister }) => {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  const registerSchema = Yup.object({
    name: Yup.string().min(3).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(30).required(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password does not match"
    ),
    image: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
      image: null,
    },
    validationSchema: registerSchema,

    onSubmit: async (values) => {
      setLoading(true);
      try {
        let formData = new FormData();
        const authSvc = new AuthService();

        formData.append("image", values.image, values.image.filename);
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("role", values.role);
        formData.append("password", values.password);

        let response = await authSvc.register(formData);
        if (response.status) {
          toast.success(
            "Your account has been registered. Please login to continue",
            { theme: "dark" }
          );
          setLoading(false);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className="ms-4">
        <h1 className="text-center text-3xl font-serif mt-6">Sign Up</h1>
        <hr className="mt-2 border-black" />
        <div className="flex flex-col ms-7 mt-5 font-serif relative">
          <div className="flex justify-end ">
            <img
              width={70}
              className="userimg absolute me-20 mt-7 "
              src={
                formik.values.image && typeof formik.values.image !== "string"
                  ? URL.createObjectURL(formik.values.image)
                  : userImg
              }
              alt=""
            />
          </div>
          <label>Enter your name</label>
          <input
            className="h-9 mt-1 mb-3 w-2/3 ps-5 bg-white border rounded-md text-black"
            type="text"
            name="name"
            required
            onChange={formik.handleChange}
            placeholder="Enter your full name"
          />{" "}
          {/* <span className="text-red-800">{formik.errors?.name}</span> */}
          <label>Enter your email</label>
          <input
            className="h-9 mt-1 mb-3 w-2/3 ps-5 bg-white border rounded-md text-black"
            type="text"
            placeholder="Enter your email"
            name="email"
            required
            onChange={formik.handleChange}
          />{" "}
          {/* <span className="text-red-800">{formik.errors?.email}</span> */}
          <div className="w-full flex">
            <div className="flex flex-col w-1/2">
              <label>Enter your password</label>
              <input
                className="h-9 mt-1 mb-3 w-3/4 ps-5  bg-white border rounded-md text-black"
                type="text"
                placeholder="Enter your password"
                name="password"
                required
                onChange={formik.handleChange}
              />{" "}
              <span className="text-red-800 ">{formik.errors?.password}</span>
            </div>
            <div className="flex flex-col w-1/2">
              <label>Confirm your password</label>
              <input
                className="h-9 mt-1 mb-3 w-3/4 ps-5  bg-white border rounded-md text-black"
                type="text"
                placeholder="Repeat your password"
                name="confirmPassword"
                required
                onChange={formik.handleChange}
              />
              <span className=" text-red-800 ">
                {formik.errors?.confirmPassword}
              </span>
            </div>
          </div>
          <label className="mt-1 mb-1">Upload your profile photo</label>
          <input
            type="file"
            required
            accept="image/*"
            name="image"
            onChange={(e) => {
              let file = e.target.files[0];
              let ext = file.name.split(".").pop();
              if (
                ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(
                  ext.toLowerCase()
                )
              ) {
                formik.setValues({
                  ...formik.values,
                  image: file,
                });
              } else {
                formik.setErrors({
                  ...formik.errors,
                  image: "File format not supported",
                });
              }
            }}
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            disabled={loading}
            type="submit"
            onClick={() => {
              formik.handleSubmit();
              if (formik.isValid && !loading) {
                submitRegister();
              }
            }}
            className="w-1/3 mt-2  bg-gray-800 p-2 pe-7 rounded-lg capitalize font-serif text-white text-md hover:bg-gray-600"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
