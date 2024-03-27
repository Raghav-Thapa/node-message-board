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

