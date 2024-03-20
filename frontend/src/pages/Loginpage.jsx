const LoginPage = () => {
  return (
    <>
      <div className="h-screen w-screen bg-gray-400 pt-28">
        <div className="bg-gray-300 h-3/4 w-4/5 ms-20 flex rounded-3xl">
          <div className="w-1/2">
            <h1 className="text-center text-3xl font-serif mt-6">Login</h1>
            <div className="flex flex-col justify-center items-center mt-7">
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
          </div>
          <div className="w-1/2">image</div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
