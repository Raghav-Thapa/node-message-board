import { useCallback, useState, useEffect } from "react";
import userImage from "../assets/captain.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Auth } from "../services/";

const HomePage = () => {
  let userInfo = JSON.parse(localStorage.getItem("user"));
  let [userList, setUserList] = useState();
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged Out Successfully");
  };

  const loadUsers = useCallback(async () => {
    try {
      let response = await Auth.authSvc.listAllUsers();
      if (response.status) {
        setUserList(response.result);
      }
    } catch (exception) {
      console.log("error fetching users", exception);
      toast.error("Error while fetching users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <div className=" w-full flex bg-black max-h-screen ">
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
                <i className="fa-solid fa-user text-slate-300 text-xl"></i>
              </div>
              <div className="mt-7 text-center cursor-pointer ">
                <i
                  onClick={Logout}
                  className="fa-solid fa-right-from-bracket  text-slate-300 text-xl"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-gray-200 w-4/12 mt-1 mb-1 rounded-s-2xl border-r-2 border-gray-300">
          <div className="flex items-center justify-center mt-5 w-full">
            <div className="relative w-10/12">
              {/* <svg
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
              </svg> */}
              <div className="text-3xl font-sans font-medium">Inbox</div>
              <hr className="border-black mt-4" />
              <div className=" font-thin text-sm pt-3">RECENT COVERSATIONS</div>
              {/* <input
                className="h-9 w-full rounded-lg ps-12 bg-indigo-200 text-black"
                type="text"
                placeholder="Search"
              /> */}
            </div>
          </div>
          <div className=" overflow-scroll h-4/5 overflow-x-hidden">
            <ul>
              {userList &&
                userList
                  .filter((user) => user._id !== userInfo.id)
                  .map((user, index) => (
                    <li key={user._id} className="cursor-pointer">
                      <div className="flex">
                        <div>
                          <img
                            src={
                              import.meta.env.VITE_IMAGE_URL +
                              "/user/" +
                              user.image
                            }
                            alt="User profile"
                            width={50}
                            className="w-12 h-14 rounded-lg ms-8 mt-8"
                          />
                        </div>
                        <div className="mt-7 font-sans font-semibold ms-3">
                          <div className="text-lg">{user.name}</div>
                          <div className="text-sm font-thin">
                            {/* replace with the actual property for the latest message */}
                            latest message sent by user
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
        <div className=" bg-gray-200 w-full mt-1 mb-1 me-2 rounded-e-2xl">
          <div className="flex p-3 ps-7 bg-slate-200 w-full">
            <div>
              <img
                src={userImage}
                alt="pic"
                width={50}
                className="w-12 h-14 rounded-full"
              />
            </div>
            <div>
              <h1 className="font-sans font-semibold text-2xl mt-2 ms-4 ">
                User name
              </h1>
              <h1 className="ms-4 flex items-center text-sm">
                <i className="fa-solid fa-circle text-green-800  me-2 fa-xs "></i>
                Active now
              </h1>
            </div>
            <div className="text-right w-4/5 p-3  ">
              <i className="fa-solid fa-xmark text-end text-2xl "></i>{" "}
            </div>
          </div>

          <div className="h-4/5 overflow-scroll overflow-x-hidden  relative mb-2">
            Messages
            <br />
            dwadawdawdw
            <div>
              <h1 className="mb-6">Hello</h1>
            </div>
            <div>
              <h1 className="mb-6">Hello</h1>
            </div>
            <div>
              <h1 className="mb-6">Hello</h1>
            </div>
            <div>
              <h1 className="mb-6">Hello</h1>
            </div>
          </div>

          <div className="">
            <input
              className="h-9 w-11/12 ps-7 bg-slate-300 text-black"
              type="text"
              placeholder="Your message"
            />
            <button>
              <i className="fa-solid fa-paper-plane ms-2 text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
