import { ChatContent, SideBar, UserLists } from "../components/HomeComponent";
import UseChatHooks from "../hooks/ChatHooks";

const HomePage = () => {
  const {
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
  } = UseChatHooks();

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
