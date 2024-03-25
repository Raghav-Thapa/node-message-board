import { NavLink, useNavigate } from "react-router-dom";

export const SideBar = ({ Logout, userId }) => {
  return (
    <>
      <div className=" bg-black w-28 h-screen">
        <div>
          <div className="mt-8 text-center cursor-pointer  ">
            <i className="fa-brands fa-connectdevelop text-slate-300 text-4xl hover:text-slate-400  "></i>
          </div>
          <div className="mt-40 flex flex-col justify-around ">
            <div className="mt-7 text-center cursor-pointer ">
              <i className="fa-solid fa-message text-slate-300 text-xl hover:text-slate-400"></i>
            </div>
            <div className="mt-7 text-center cursor-pointer  ">
              <NavLink to={"/profile/" + userId}>
                {" "}
                <i className="fa-solid fa-user text-slate-300 text-xl hover:text-slate-400"></i>
              </NavLink>
            </div>
            <div className="mt-7 text-center cursor-pointer ">
              <i
                onClick={Logout}
                className="fa-solid fa-right-from-bracket  text-slate-300 text-xl hover:text-slate-400"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const UserLists = ({
  loading,
  userList,
  userInfo,
  selectUser,
  latestMessage,
}) => {
  return (
    <>
      <div className=" bg-gray-200 w-4/12 mt-1 mb-1 rounded-s-2xl border-r-2 border-gray-300">
        <div className="flex items-center justify-center mt-5 w-full">
          <div className="relative w-10/12">
            <div className="text-3xl font-sans font-medium">Inbox</div>
            <hr className="border-black mt-4" />
            <div className=" font-thin text-sm pt-3">RECENT COVERSATIONS</div>
          </div>
        </div>
        <div className=" overflow-scroll h-4/5 overflow-x-hidden">
          <ul>
            {loading && (
              <div className="text-center mt-32">
                <i className="fa-solid fa-spinner fa-spin-pulse text-6xl"></i>
              </div>
            )}
            {userList &&
              userInfo &&
              userList
                .filter((user) => user._id !== userInfo.id)
                .map((user, index) => (
                  <li
                    key={user._id}
                    className="cursor-pointer"
                    onClick={() => selectUser(user)}
                  >
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
                        <div className="text-lg capitalize ">{user.name}</div>
                        <div className="text-sm font-thin">
                          {/* replace with the actual property for the latest message */}{" "}
                          {latestMessage[user._id] || "No new messages yet"}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export const ChatContent = ({
  selectedUser,
  setSelectedUser,
  loadingMsg,
  chatHistory,
  userList,
  messagesEnd,
  messageInput,
  setMessageInput,
  sendMessage,
  userInfo,
}) => {
  return (
    <>
      {selectedUser ? (
        <div className=" bg-gray-200 w-full mt-1 mb-1 me-2 rounded-e-2xl">
          <div className=" flex p-3 ps-7 bg-slate-200 w-full">
            <div>
              {selectedUser && (
                <img
                  src={
                    import.meta.env.VITE_IMAGE_URL +
                    "/user/" +
                    selectedUser.image
                  }
                  alt="pic"
                  width={50}
                  className="w-16 h-16 rounded-full"
                />
              )}
            </div>
            <div>
              <h1 className="font-sans font-semibold text-2xl mt-2 ms-4 w-full ">
                {selectedUser && selectedUser.name}
              </h1>
              <h1 className="ms-4 flex items-center text-sm">
                <i className="fa-solid fa-circle text-green-800  me-2 fa-xs "></i>
                Active now
              </h1>
            </div>
            <div className="text-right w-4/5 p-3  ">
              <i
                onClick={() => setSelectedUser(null)}
                className="fa-solid fa-xmark text-end text-2xl cursor-pointer "
              ></i>{" "}
            </div>
          </div>
          <div className="h-4/5 overflow-scroll overflow-x-hidden  relative mb-2">
            {loadingMsg && (
              <div className="text-center mt-48">
                <i className="fa-solid fa-spinner fa-spin-pulse text-6xl"></i>
              </div>
            )}
            {chatHistory.map((message, index) => {
              const isSender = message.senderId === userInfo.id;
              const userImage = isSender
                ? userList.find((user) => user._id === userInfo.id)?.image
                : userList.find((user) => user._id === selectedUser._id)?.image;

              return (
                <div
                  key={index}
                  className={
                    isSender
                      ? "text-blue-500 me-10 mb-5 flex justify-end"
                      : " text-green-800 ms-10 mt-5"
                  }
                >
                  <div className="flex ">
                    {isSender ? (
                      <>
                        {" "}
                        <div className=" me-2 bg-blue-500 rounded-lg ps-3 pt-2 pe-4">
                          <h1 className="mb-4 text-white font-sans">
                            {message.content}
                          </h1>
                        </div>
                        <div>
                          <img
                            src={
                              import.meta.env.VITE_IMAGE_URL +
                              "/user/" +
                              userImage
                            }
                            alt="pic"
                            width={50}
                            className="w-10 h-10 rounded-lg"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <img
                            src={
                              import.meta.env.VITE_IMAGE_URL +
                              "/user/" +
                              userImage
                            }
                            alt="pic"
                            width={50}
                            className="w-10 h-10 rounded-lg"
                          />
                        </div>
                        <div className=" ms-2 bg-slate-300 rounded-lg ps-3 pt-2 pe-4">
                          <h1 className="mb-4 text-black font-sans ">
                            {message.content}
                          </h1>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEnd} />
          </div>
          <div className="">
            <input
              className=" h-10 w-11/12 ps-7 bg-slate-300 text-black"
              type="text"
              placeholder="Your message"
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage(event.target.value);
                }
              }}
            />
            <button
              onClick={() => {
                sendMessage(messageInput);
              }}
            >
              <i className="fa-solid fa-paper-plane ms-2 text-2xl"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className=" bg-gray-200 w-full mt-1 mb-1 me-2 rounded-e-2xl">
          <div>
            <i className="fa-regular fa-comments text-gray-700 text-9xl text-center w-full mt-40  "></i>
          </div>
          <div>
            <h1 className=" font-mono text-6xl fontt text-center mt-5">
              Start a Conversation !
            </h1>
          </div>
        </div>
      )}
    </>
  );
};
