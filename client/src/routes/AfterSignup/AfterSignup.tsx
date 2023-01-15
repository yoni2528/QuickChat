import React, { useState } from "react";

import ChooseAvatar from "../../components/AfterSignup/ChooseAvatar";
import ChooseName from "../../components/AfterSignup/ChooseName";

const AfterSignup = () => {
  const [isAvatar, setIsAvatar] = useState<boolean>(false);

  const handleChooseAvatar = () => {
    setIsAvatar(true);
  };

  return (
    <div className="w-full h-[100vh] bg-[#eee] flex items-center justify-center ">
      <div className=" animate-[enter_0.5s]">
        {isAvatar ? (
          <>
            <p className="mb-4 text-lg">What is your name?</p>
          </>
        ) : (
          <>
            <h2 className=" mb-4 text-2xl">Hello, Welcome to QuickChat 😁</h2>
            <p className="mb-4 text-lg">Please choose your avatar, you can change it later</p>
          </>
        )}

        {isAvatar ? <ChooseName /> : <ChooseAvatar onAvatarChoose={handleChooseAvatar} />}
      </div>
    </div>
  );
};

export default AfterSignup;
