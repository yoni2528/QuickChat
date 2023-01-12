import React, { useState } from "react";

import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import ProfileImage from "../ProfileImage/ProfileImage";

const ProfileSideBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`absolute transition-all duration-700 z-10 ${
          isMenuOpen ? "right-[24.5%] top-[10%]" : "right-[2%] top-[3.5%]"
        }`}
        onClick={handleOpenMenu}
      >
        {isMenuOpen ? <IoChevronForwardOutline className="w-6 h-6" /> : <IoChevronBackOutline className="w-6 h-6 " />}
      </button>
      <div
        className={`bg-[white] transition-all duration-700 border-l-2 border-[#eee] w-1/2 sm:w-1/4 flex-col h-full absolute top-0 ${
          isMenuOpen ? "right-[0] opacity-1" : "right-[-100%] opacity-0"
        }`}
      >
        <div className="h-full p-6 flex flex-col gap-6 items-center">{<ProfileImage />}</div>
      </div>
    </>
  );
};

export default ProfileSideBar;
