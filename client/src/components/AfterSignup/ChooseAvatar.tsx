import React, { useContext } from "react";

const avatarList = ["avatar1", "avatar2", "avatar3", "avatar4"];

import useDatabseRequests from "../../api/DatabaseRequests/useDatabseRequests";

import { UserContext } from "../../store/context";

import { BASE_URL } from "../../config/config";

const ChooseAvatar: React.FC<{ onAvatarChoose: () => void }> = ({ onAvatarChoose }) => {
  const { handleUpdateUserDetails } = useDatabseRequests();

  const { handleSetUser } = useContext(UserContext);

  const handleAvatarChange = (avatar: string) => {
    handleUpdateUserDetails.mutateAsync({ image: `${avatar}.png` }).then((data) => {
      handleSetUser(data.user);
    });
    onAvatarChoose();
  };

  return (
    <div>
      <div>
        <ul className="flex gap-8">
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
  );
};

export default ChooseAvatar;
