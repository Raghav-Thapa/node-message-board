const HomePage = () => {
  return (
    <>
      <div className=" w-full flex bg-black">
        <div className=" bg-black w-28 h-screen">
          <div>
            <div className="mt-7 text-center cursor-pointer  ">
              <i className="fa-solid fa-comments text-slate-300 text-2xl "></i>
            </div>
            <div className="mt-40 flex flex-col justify-around ">
              <div className="mt-7 text-center cursor-pointer ">
                <i className="fa-solid fa-message text-slate-300 text-xl"></i>
              </div>
              <div className="mt-7 text-center cursor-pointer  ">
                <i class="fa-solid fa-user text-slate-300 text-xl"></i>
              </div>
              <div className="mt-7 text-center cursor-pointer ">
                <i className="fa-solid fa-right-from-bracket  text-slate-300 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-gray-200 w-4/12 mt-1 mb-1 rounded-s-2xl border-r-2 border-gray-300">
          <div className="flex items-center justify-center mt-5 w-full">
            <div className="relative w-4/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6  text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                className="h-9 w-full rounded-lg ps-12 bg-indigo-200 text-black"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>

          <div>Users list</div>
        </div>
        <div className=" bg-gray-200 w-full mt-1 mb-1 me-2 rounded-e-2xl">
          Message
        </div>
      </div>
    </>
  );
};

export default HomePage;
