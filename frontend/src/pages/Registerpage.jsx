import loginImage from "../assets/loginimg.jpg";

const RegisterPage = () => {
  return (
    <>
      <div className="h-screen w-screen bg-gray-400 pt-28">
        <div className="bg-gray-300 h-3/4 w-4/5 ms-20 flex rounded-3xl">
          <div className="w-1/2">
            <h1 className="text-center text-3xl font-serif mt-6">Sign Up</h1>
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
              <button className="w-1/3 mt-2  bg-gray-800 p-2 pe-7 rounded-lg capitalize font-serif text-white text-md hover:bg-gray-600">
                Sign Up
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <img src={loginImage} alt="" className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
