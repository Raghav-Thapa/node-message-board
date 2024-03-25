import { toast } from "react-toastify";
import { Auth } from "../services/";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SideBar } from "../components/HomeComponent";
import bgImg from "../assets/loginimg.jpg";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [editProfile, setEditProfile] = useState(false);

  const handleEditProfile = () => {
    setEditProfile(true);
  };

  let userId = JSON.parse(localStorage.getItem("user"));
  const getUserDetail = async () => {
    try {
      let response = await Auth.authSvc.getUserById(userId.id);
      setDetail(response.result);
    } catch (exception) {
      toast.error("User detail cannot be fetched");
      navigate("/go");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (typeof values.image !== "object") {
        delete values.image;
      }
      const response = await Auth.authSvc.updateUser(values, userId.id);
      toast.success(response.msg);
      navigate("/go");
    } catch (error) {
      toast.error("Cannot update user.");
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: detail ? detail.name : "",
      email: detail ? detail.email : "",
      password: "",
      confirmPassword: "",
      image: detail ? detail.image : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3),
      email: Yup.string().email(),
      password: Yup.string().min(3).max(30),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password does not match"
      ),
      image: Yup.string(),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <>
      <div className=" w-full flex bg-black max-h-screen ">
        <SideBar />
        <div className=" bg-gray-200 w-full mt-1 mb-1 me-2 rounded-e-2xl">
          <div className="w-full h-2/3 rounded-2xl ps-3 pe-3 pt-2">
            <img className="h-2/3 w-full rounded-3xl" src={bgImg} alt="" />
            <div className=" flex justify-center">
              {detail && detail.image && (
                <img
                  width={400}
                  className="h-56 w-56 rounded-full -mt-24"
                  src={import.meta.env.VITE_IMAGE_URL + "/user/" + detail.image}
                  alt=""
                />
              )}
            </div>
            <div className="text-5xl font-semibold text-center mt-5">
              {" "}
              {detail && detail.name}
            </div>
            <div className="text-center text-lg mt-2 ">
              {detail && detail.email}
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleEditProfile}
                className="w-1/6  mt-3  bg-gray-800 p-2 pe-7 rounded-lg capitalize font-serif text-white text-md hover:bg-gray-600"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {editProfile && (
          <div className="bg-gray-300 absolute ms-96 mt-28 w-3/5 h-3/4 rounded-xl ">
            <div className="float-end me-5 mt-3">
              <i
                onClick={() => setEditProfile(false)}
                class="fa-solid fa-circle-xmark text-xl cursor-pointer"
              ></i>
            </div>
            <div>
              <div className="ps-10 pt-12">
                <label>Enter your name</label>
                <input
                  className="h-9 mt-1 mb-3 w-2/3 ps-5 bg-white border rounded-md text-black"
                  type="text"
                  name="name"
                  // onChange={formik.handleChange}
                />{" "}
                {/* <span className="text-red-800">{formik.errors?.name}</span> */}
                <label>Enter your email</label>
                <input
                  className="h-9 mt-1 mb-3 w-2/3 ps-5 bg-white border rounded-md text-black"
                  type="text"
                  name="email"
                  // onChange={formik.handleChange}
                />{" "}
                {/* <span className="text-red-800">{formik.errors?.email}</span> */}
                <div className="w-full flex">
                  <div className="flex flex-col w-1/2">
                    <label>Enter your password</label>
                    <input
                      className="h-9 mt-1 mb-3 w-3/4 ps-5  bg-white border rounded-md text-black"
                      type="text"
                      name="password"
                      // onChange={formik.handleChange}
                    />{" "}
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label>Confirm your password</label>
                    <input
                      className="h-9 mt-1 mb-3 w-3/4 ps-5  bg-white border rounded-md text-black"
                      type="text"
                      name="confirmPassword"
                      // onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <label className="mt-1 mb-1">Upload your profile photo</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  // onChange={(e) => {
                  //   let file = e.target.files[0];
                  //   let ext = file.name.split(".").pop();
                  //   if (
                  //     [
                  //       "jpg",
                  //       "jpeg",
                  //       "png",
                  //       "gif",
                  //       "bmp",
                  //       "webp",
                  //       "svg",
                  //     ].includes(ext.toLowerCase())
                  //   ) {
                  //     formik.setValues({
                  //       ...formik.values,
                  //       image: file,
                  //     });
                  //   } else {
                  //     formik.setErrors({
                  //       ...formik.errors,
                  //       image: "File format not supported",
                  //     });
                  //   }
                  // }}
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  // disabled={loading}
                  type="submit"
                  // onClick={() => {
                  //   formik.handleSubmit();
                  //   if (formik.isValid && !loading) {
                  //     submitRegister();
                  //   }
                  // }}
                  className="w-1/3 mt-2  bg-gray-800 p-2 pe-7 rounded-lg capitalize font-serif text-white text-md hover:bg-gray-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <>
        <div></div>
      </>
      <div>
        <h1>User Profile</h1>
        {detail && <div>{detail.name}</div>}
      </div>

      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            name="image"
            onChange={formik.handleChange}
            value={formik.values.image}
          />
        </label>
        <button onClick={formik.handleSubmit} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ProfilePage;
