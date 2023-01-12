import React, { useContext } from "react";
import useDatabseRequests from "../../api/DatabaseRequests/useDatabseRequests";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/context";
import { BASE_URL } from "../../config/config";

const avatarList = ["avatar1", "avatar2", "avatar3", "avatar4"];

const ChooseAvatar = () => {
  const { handleUpdateUserDetails } = useDatabseRequests();
  const { handleSetUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleAvatarChange = (avatar: string) => {
    handleUpdateUserDetails.mutateAsync({ image: `${avatar}.png` }).then((data) => {
      handleSetUser(data.user);
    });
    navigate("/chat");
  };

  return (
    <div className="w-full h-[100vh] bg-[#eee] flex items-center justify-center">
      <div>
        <h2 className="mb-8 text-2xl">Please choose an avatar, you can change it later</h2>
        <div>
          <ul className="flex justify-around">
            {avatarList.map((avatar: string, index: number) => {
              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      handleAvatarChange(avatar);
                    }}
                  >
                    <img
                      className="w-24 h-24 hover:border-2 hover:border-[#ddd] rounded-[50%]"
                      src={`${BASE_URL}/${avatar}.png`}
                    ></img>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChooseAvatar;
