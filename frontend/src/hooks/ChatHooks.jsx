import { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Auth } from "../services/";
import io from "socket.io-client";

const UseChatHooks = () => {
  const [userInfo, setUserInfo] = useState(null);
  let [userList, setUserList] = useState();
  let [loading, setLoading] = useState(true);
  let [loadingMsg, setLoadingMsg] = useState(true);
  const [latestMessage, setLatestMessage] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const messagesEnd = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate();
  let userD = JSON.parse(localStorage.getItem("user"));

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
      setLatestMessage((prevLatestMessage) => ({
        ...prevLatestMessage,
        [selectedUser._id]: message,
      }));
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  useEffect(() => {
    const userInfoString = localStorage.getItem("user");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    setUserInfo(userInfo);
  }, []);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const Logout = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logged Out Successfully");
  };

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3000");

     socketRef.current.on("chat message", (message) => {
       setChatHistory((chatHistory) => [...chatHistory, message]);
       setLatestMessage((prevLatestMessage) => ({
         ...prevLatestMessage,
         [message.senderId]: message.content,
       }));
     });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);



  return {
    userInfo,
    userList,
    loading,
    loadingMsg,
    latestMessage,
    messageInput,
    setMessageInput,
    messagesEnd,
    selectedUser,
    setSelectedUser,
    chatHistory,
    userD,
    selectUser,
    sendMessage,
    Logout,
  };
};

export default UseChatHooks;
