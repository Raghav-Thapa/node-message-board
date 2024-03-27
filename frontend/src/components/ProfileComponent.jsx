import bgImg from "../assets/loginimg.jpg";

export const ProfileInfo = ({ detail, handleEditProfile }) => {
  return (
    <>
      <div className=" bg-gray-200 w-full mt-1 mb-1 me-2 rounded-2xl">
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
    </>
  );
};

export const ProfileEdit = ({ onClick, onchange, formik }) => {
  return (
    <>
      <div className="bg-gray-300 absolute ms-96 mt-28 w-3/5 h-3/4 rounded-xl ">
        <div className="float-end me-5 mt-3">
          <i
            onClick={onClick}
            class="fa-solid fa-circle-xmark text-xl cursor-pointer"
          ></i>
        </div>
        <div>
          <div className="ps-20 pt-16 font-serif">
            <label className="me-2">Enter your name:</label>
            <input
              className="h-9 mt-1 mb-8 w-2/5 ps-5 bg-white border rounded-md text-black"
              type="text"
              name="name"
              onChange={onchange}
              value={formik.values.name}
            />{" "}
            <br />
            {/* <span className="text-red-800">{formik.errors?.name}</span> */}
            <label className="me-2">Enter your email:</label>
            <input
              className="h-9 mt-1 mb-8 w-2/5 ps-5 bg-white border rounded-md text-black"
              type="text"
              name="email"
              onChange={onchange}
              value={formik.values.email}
            />{" "}
            {/* <span className="text-red-800">{formik.errors?.email}</span> */}
            <div className="w-full flex">
              <div className="flex flex-col w-1/2">
                <label>Enter new password:</label>
                <input
                  className="h-9 mt-1 mb-8 w-3/4 ps-5  bg-white border rounded-md text-black"
                  type="password"
                  name="password"
                  onChange={onchange}
                />{" "}
              </div>
              <div className="flex flex-col w-1/2">
                <label>Confirm your password:</label>
                <input
                  className="h-9 mt-1 mb-8 w-3/4 ps-5  bg-white border rounded-md text-black"
                  type="password"
                  name="confirmPassword"
                  onChange={onchange}
                />
              </div>
            </div>
            <label className="mt-1 mb-1 me-3">Change your profile photo:</label>
            {/* <input
              type="file"
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
            /> */}
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
  );
};
