import React, { useContext, useState } from "react";

import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

import { UserType } from "../../routes/Chat/Chat";
import { UserContext } from "../../store/context";
import UserList from "../UserList/UserList";

const SideBar: React.FC<{
  userList: UserType[];
  selectedUser: any;
  onUserChoose: (userId: string, nickName: string, image: string) => void;
  messageList: any;
}> = ({ userList, onUserChoose, messageList }) => {
  const [searchInput, setSearchInput] = useState<string>();

  const { handleLogout, isMobileMenuOpen, handleMobileMenuToggle } = useContext(UserContext);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <button
        className={`absolute sm:hidden ${isMobileMenuOpen ? "left-[67%] top-[50%]" : "left-0 top-[50%]"}`}
        onClick={handleMobileMenuToggle}
      >
        {isMobileMenuOpen ? (
          <IoChevronBackOutline className="w-6 h-6" />
        ) : (
          <IoChevronForwardOutline className="w-6 h-6 " />
        )}
      </button>
      <div
        className={`bg-[#363E47] w-[67%] flex-col ${
          isMobileMenuOpen ? "flex absolute" : "hidden "
        }  h-full sm:flex top-0 left-0 w-1/2 sm:w-1/2 lg:w-1/2 sm:static`}
      >
        <div className="h-full p-6 flex flex-col gap-6 items-start">
          <input
            placeholder="search here..."
            className="bg-[#262b32] w-full rounded-lg px-2 py-1 text-white focus:outline-none"
            onChange={handleSearchInput}
          ></input>
          <div className="overflow-y-scroll w-full h-[60%] scrollbar-hide flex flex-col ">
            {
              <UserList
                messageList={messageList}
                userList={userList}
                onUserChoose={onUserChoose}
                searchInput={searchInput}
              />
            }
          </div>
        </div>
        <button className="absolute bottom-6 left-[14%] text-white z-10 " onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default SideBar;
