import { useCallback, useState, useEffect, useRef } from "react";
import userImage from "../assets/captain.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Auth } from "../services/";
import io from "socket.io-client";
import { ChatContent, SideBar, UserLists } from "../components/HomeComponent";

const HomePage = () => {
  // let userInfo = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState(null);
  let [userList, setUserList] = useState();
  let [loading, setLoading] = useState(true);
  let [loadingMsg, setLoadingMsg] = useState(true);
  const navigate = useNavigate();
  const [latestMessage, setLatestMessage] = useState({});

  useEffect(() => {
    const latestMessageString = localStorage.getItem("latestMessage");
    const latestMessage = latestMessageString
      ? JSON.parse(latestMessageString)
      : {};
    setLatestMessage(latestMessage);
  }, []);

  useEffect(() => {
    const latestMessageString = JSON.stringify(latestMessage);
    localStorage.setItem("latestMessage", latestMessageString);
  }, [latestMessage]);

  useEffect(() => {
    const userInfoString = localStorage.getItem("user");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    //  console.log("userInfo:", userInfo);
    //  if (userInfo) {
    //   //  console.log("userInfo._id:", userInfo.id);
    //  }
    setUserInfo(userInfo);
  }, []);
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
  const [messageInput, setMessageInput] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const selectUser = async (user) => {
    console.log("Selecting user", user);
    setSelectedUser(user);
    setLoadingMsg(true);

    try {
      console.log("Fetching chat history");
      const response = await Auth.msgSvc.getMessages(user._id);
      console.log("Chat history fetched", response);
      setLoadingMsg(false);
      console.log("loadingMsg set to false");
      if (response.messages) {
        setChatHistory(response.messages);
      } else {
        setChatHistory([]);
      }
    } catch (error) {
      console.error("Error fetching chat history", error);
    }
  };

  const sendMessage = async (message) => {
    if (!selectedUser || !selectedUser._id) {
      console.error("No user selected or user ID is undefined");
      return;
    }
    if (!userInfo || !userInfo.id) {
      console.error("No user info or user ID is undefined");
      return;
    }
    console.log("userInfo.id:", userInfo.id);
    console.log("selectedUser._id:", selectedUser._id);
    try {
      const requestBody = {
        content: message,
        participants: [userInfo.id.toString(), selectedUser._id.toString()],
      };

      await Auth.msgSvc.sendMessage(requestBody);
      setChatHistory([
        ...chatHistory,
        { content: message, senderId: userInfo.id },
      ]);
      setLatestMessage((latestMessages) => {
        const newLatestMessages = {
          ...latestMessages,
          [selectedUser._id]: message,
        };
        localStorage.setItem(
          "latestMessage",
          JSON.stringify(newLatestMessages)
        );
        return newLatestMessages;
      });
      setMessageInput("");
      socketRef.current.emit("chat message", message);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // const socketRef = useRef();
  // useEffect(() => {
  //   socketRef.current = io.connect("http://localhost:3000");

  //   socketRef.current.on("chat message", (message) => {
  //     setChatHistory((chatHistory) => [...chatHistory, message]);
  //   });

  //   return () => {
  //     socketRef.current.disconnect();
  //   };
  // }, []);
  let userD = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className=" w-full flex bg-black max-h-screen ">
        <SideBar Logout={Logout} userId={userD.id} />
        <UserLists
          loading={loading}
          userList={userList}
          userInfo={userInfo}
          selectUser={selectUser}
          latestMessage={latestMessage}
        />
        <ChatContent
          userInfo={userInfo}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          loadingMsg={loadingMsg}
          chatHistory={chatHistory}
          userList={userList}
          messagesEnd={messagesEnd}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          sendMessage={sendMessage}
        />
      </div>
    </>
  );
};

export default HomePage;
