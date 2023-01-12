import React, { useContext, useEffect, useRef } from "react";
import { BASE_URL } from "../../config/config";
import { UserContext } from "../../store/context";
import DisplayMessages from "../DisplayMessages/DisplayMessages";

const ChatWindow: React.FC<{
  selectedUser: any;
  messageList: any;
}> = ({ selectedUser, messageList }) => {
  const messageWindowRef = useRef<HTMLDivElement>(null);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    messageWindowRef.current?.scrollTo({
      top: messageWindowRef.current?.scrollHeight,
      behavior: "auto",
    });
  }, [messageList, selectedUser]);

  return (
    <>
      <div
        className={`${
          selectedUser
            ? "visible  opacity-1 translate-y-[0] flex gap-2"
            : "invisible opacity-0 translate-y-[-100%] hidden"
        } bg-[#FFFFFF] transition duration-400 h-[10%] flex items-center p-4`}
      >
        <img className="w-8 rounded-[50%]" src={`${BASE_URL}/${selectedUser?.image}`}></img>
        <p className="font-bold text-primary_grey">{selectedUser?.nickName}</p>
      </div>
      <div ref={messageWindowRef} className="bg-[#F2F7F7] h-full flex flex-col p-12 gap-4 overflow-y-scroll ">
        <DisplayMessages currentUser={currentUser} messageList={messageList} selectedUser={selectedUser} />
      </div>
    </>
  );
};

export default ChatWindow;
