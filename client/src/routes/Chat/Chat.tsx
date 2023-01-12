import React, { useEffect, useState, useContext } from "react";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import MessageField from "../../components/MessageField/MessageField";
import SideBar from "../../components/SideBar/SideBar";

import * as io from "socket.io-client";

import { UserContext } from "../../store/context";
import useDatabseRequests from "../../api/DatabaseRequests/useDatabseRequests";
import ProfileSideBar from "../../components/ProfileSideBar/ProfileSideBar";
import { BASE_URL } from "../../config/config";

export type Message = {
  to: string;
  from: string;
  message: string;
};

export type UserType = {
  nickName: string;
  id: string;
  image?: string;
};

const socket = io.connect(BASE_URL);

const Chat = () => {
  const { currentUser, token, handleMobileMenuClose } = useContext(UserContext);
  const { handleGetAllUsers, handleGetAllMessagesForUser, handleCreateMessage, handleUpdateMessageRead } =
    useDatabseRequests();

  const [usersList, setUsersList] = useState<UserType[]>([]);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    if (!token) return;
    if (!currentUser) return;
    handleGetAllUsers.mutateAsync().then((data) => {
      setUsersList(data.users);
    });
    handleFetchMessages(currentUser.id);
    socket.emit("open_room", { userId: currentUser.id, nickName: currentUser.nickName });

    socket.on("recieve_message", ({ from, message, to }) => {
      setMessageList((prevState: any) => {
        return [...prevState, { to, from, message, read: false }];
      });
    });
  }, [currentUser, token, socket]);

  const handleUserChoosed = (userId: string, nickName: string, image: string) => {
    handleMobileMenuClose();
    handleUpdateAndFetch(userId);
    setSelectedUser({ nickName, id: userId, image });
    socket.emit("join_room", userId);
  };

  const handleNewMessage = (message: string) => {
    setMessageList((prevState: any) => {
      return [...prevState, { to: selectedUser?.id, from: currentUser.id, message: message, nickName: "" }];
    });
    if (!selectedUser) return;
    if (!message) return;
    const messageObj = {
      to: selectedUser.id,
      from: currentUser.id,
      message: message,
      date: Date.now(),
    };
    handleCreateMessage.mutateAsync(messageObj).then(() => {
      socket.emit("send_message", messageObj);
    });
  };

  const handleUpdateAndFetch = (id: string) => {
    handleUpdateMessageRead.mutateAsync(id).then((data) => setMessageList(data.messages));
  };

  const handleFetchMessages = (id: string) => {
    handleGetAllMessagesForUser.mutateAsync(id).then((data) => setMessageList(data.messages));
  };

  return (
    <div className="h-[100vh] bg-[#eee] flex align-center ">
      <div className="w-[90%] lg:w-[65%] h-[80%] rounded-lg overflow-hidden m-auto flex relative animate-[enter_1s]  ">
        <SideBar
          messageList={messageList}
          onUserChoose={handleUserChoosed}
          userList={usersList}
          selectedUser={selectedUser}
        />
        <div className="w-full flex flex-col">
          <ChatWindow messageList={messageList} selectedUser={selectedUser} />
          <div className="bg-[#FFFFFF] ">
            <MessageField selectedUser={selectedUser?.nickName} onMessageSend={handleNewMessage} />
          </div>
        </div>
        <ProfileSideBar />
      </div>
    </div>
  );
};

export default Chat;
