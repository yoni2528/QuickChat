import React, { useContext } from "react";
import { UserContext } from "../../store/context";

import User from "./User";

const UserList: React.FC<{ userList: any; messageList: any; searchInput: any; onUserChoose: any }> = ({
  userList,
  messageList,
  searchInput,
  onUserChoose,
}) => {
  const { currentUser, onlineUsersList } = useContext(UserContext);
  return (
    <div>
      {userList
        .filter(({ nickName }: any) => {
          if (!nickName) return;
          if (!searchInput) return nickName;
          return nickName.includes(searchInput) && nickName !== currentUser.nickName;
        })
        .map(({ _id, nickName, image }: any, index: number) => {
          const isOnline = onlineUsersList.some((val) => val === _id);
          const newMessageList = messageList.filter((message: any) => {
            return message.from === _id && message.to === currentUser.id;
          });
          return (
            <User
              userMessageList={newMessageList}
              onUserChoose={onUserChoose}
              key={index}
              _id={_id}
              nickName={nickName}
              image={image}
              isOnline={isOnline}
            />
          );
        })}
    </div>
  );
};

export default UserList;
