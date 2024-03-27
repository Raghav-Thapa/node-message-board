import { toast } from "react-toastify";
import { Auth } from "../services/";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SideBar } from "../components/HomeComponent";
import { ProfileInfo } from "../components/ProfileComponent";
import { FormField } from "../components/FormComponent";
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
      if (values.password === "") {
        delete values.password;
      }
      if (typeof values.image !== "object") {
        delete values.image;
      }
      const response = await Auth.authSvc.updateUser(values, userId.id);
      toast.success(response.msg);
      // navigate("/go");
      setEditProfile(false);
    } catch (error) {
      toast.error("Cannot update user.");
    }
  };

  const Logout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged Out Successfully");
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
  }, [editProfile]);

  return (
    <>
      <div className=" w-full flex bg-black max-h-screen ">
        <SideBar Logout={Logout} />
        <ProfileInfo detail={detail} handleEditProfile={handleEditProfile} />

        {editProfile && (
          <>
            <div className="bg-gray-300 absolute ms-96 mt-28 w-3/5 h-3/4 rounded-xl ">
              <div className="float-end me-5 mt-3">
                <i
                  onClick={() => setEditProfile(false)}
                  className="fa-solid fa-circle-xmark text-xl cursor-pointer"
                ></i>
              </div>
              <div>
                <div className="ps-20 pt-16 font-serif">
                  <label className="me-2">Enter your name:</label>
                  <FormField
                    classname={
                      "h-9 mt-1 mb-8 w-2/5 ps-5 bg-white border rounded-md text-black"
                    }
                    type={"text"}
                    name={"name"}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <br />
                  {/* <span className="text-red-800">{formik.errors?.name}</span> */}
                  <label className="me-2">Enter your email:</label>
                  <FormField
                    classname={
                      "h-9 mt-1 mb-8 w-2/5 ps-5 bg-white border rounded-md text-black"
                    }
                    type={"text"}
                    name={"email"}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {/* <span className="text-red-800">{formik.errors?.email}</span> */}
                  <div className="w-full flex">
                    <div className="flex flex-col w-1/2">
                      <label>Enter new password:</label>
                      <FormField
                        classname={
                          "h-9 mt-1 mb-8 w-3/4 ps-5  bg-white border rounded-md text-black"
                        }
                        type={"password"}
                        name={"password"}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label>Confirm your password:</label>
                      <FormField
                        classname={
                          "h-9 mt-1 mb-8 w-3/4 ps-5  bg-white border rounded-md text-black"
                        }
                        type={"password"}
                        name={"confirmPassword"}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <label className="mt-1 mb-1 me-3">
                    Change your profile photo:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      let ext = file.name.split(".").pop();
                      if (
                        [
                          "jpg",
                          "jpeg",
                          "png",
                          "gif",
                          "bmp",
                          "webp",
                          "svg",
                        ].includes(ext.toLowerCase())
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
                    type="submit"
                    onClick={formik.handleSubmit}
                    className="w-1/3 mt-16  bg-gray-800 p-2 pe-7 rounded-lg capitalize font-serif text-white text-md hover:bg-gray-600"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
