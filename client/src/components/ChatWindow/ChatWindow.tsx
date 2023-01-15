import React, { useContext, useEffect, useRef } from "react";
import { BASE_URL } from "../../config/config";
import { UserContext } from "../../store/context";
import DisplayMessages from "../DisplayMessages/DisplayMessages";

import sadMan from "../../assets/sad-man.png";

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
        {selectedUser?.image && <img className="w-8 rounded-[50%]" src={`${BASE_URL}/${selectedUser?.image}`}></img>}

        <p className="font-bold text-primary_grey">{selectedUser?.nickName}</p>
      </div>

      <div ref={messageWindowRef} className="bg-[#F2F7F7] h-full flex flex-col p-12 gap-4 overflow-y-scroll ">
        {selectedUser ? (
          <DisplayMessages currentUser={currentUser} messageList={messageList} selectedUser={selectedUser} />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <img src={sadMan} className="w-[450px]"></img>
            <h3 className="text-md xl:text-2xl font-bold text-primary_grey">Alone in the Chat-o-sphere?</h3>
            <p className="text-sm xl:text-lg font text-primary_grey">Choose a friend from the list to chat with</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWindow;
