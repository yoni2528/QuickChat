import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config/config";

type User = {
  nickName: string;
  _id: string;
  onUserChoose: (_id: string, nickName: string, image: string) => void;
  userMessageList: any;
  image: string;
  isOnline: boolean;
};

const User: React.FC<User> = ({ nickName, _id, onUserChoose, userMessageList, image, isOnline }) => {
  const [unreadMessages, setUnreadMessages] = useState<any>();
  const [lastMessage, setLastMessage] = useState<any>("");

  useEffect(() => {
    if (!userMessageList) return;
    const unread = userMessageList.filter((message: any) => message.read === false);
    setUnreadMessages(unread);

    if (!(userMessageList.length > 1)) return;

    const lastMessage = userMessageList[userMessageList.length - 1].message;
    setLastMessage(lastMessage);
  }, [userMessageList]);

  return (
    <div className="flex items-center justify-between w-full text-white mt-4 bg-[white] rounded-lg py-2 px-3 shadow-2xl">
      <div className="flex gap-2 items-center">
        <div
          className="w-8 h-8 md:w-12 md:h-12 bg-cover rounded-[50%] relative"
          style={{
            backgroundImage: `url("${BASE_URL}/${image}")`,
          }}
        >
          {isOnline && <div className="w-2 h-2 sm:h-3 sm:w-3 bg-[#33dc52] rounded-[50%] absolute right-1 top-0"></div>}
        </div>
        <div>
          <button
            onClick={() => {
              onUserChoose(_id, nickName, image);
            }}
            className="text-xs lg:text-sm font-bold text-primary_grey"
          >
            {nickName}
          </button>
          <p className="text-xs text-primary_grey">
            {lastMessage.length > 14 ? `${lastMessage.slice(0, 14)}...` : lastMessage}
          </p>
        </div>
      </div>
      {userMessageList ? (
        <div className="bg-secondary w-5 h-5 flex items-center justify-center rounded-[50%]">
          <p className="text-xs">{unreadMessages ? unreadMessages.length : 0}</p>
        </div>
      ) : null}
    </div>
  );
};

export default User;
