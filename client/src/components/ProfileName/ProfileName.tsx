import React, { useState, useRef, useContext, useEffect } from "react";

import { UserContext } from "../../store/context";

import { IoPencilOutline } from "react-icons/io5";
import useDatabseRequests from "../../api/DatabaseRequests/useDatabseRequests";

const ProfileName = () => {
  const [editNickName, setEditNickName] = useState<boolean>(false);
  const [isEditHover, setIsEditHover] = useState<boolean>(false);
  const [nickName, setNickName] = useState<string>();

  const nickNameInputRef = useRef<HTMLInputElement>(null);

  const { currentUser } = useContext(UserContext);

  const { handleUpdateUserDetails } = useDatabseRequests();

  const handleEditNickName = () => {
    setEditNickName(!editNickName);
    setIsEditHover(false);
  };

  const handleSubmitNickName = (e: React.FormEvent) => {
    e.preventDefault();
    setEditNickName(false);
    if (!nickNameInputRef.current) return;

    handleUpdateUserDetails
      .mutateAsync({ nickName: nickNameInputRef.current.value })
      .then((data) => setNickName(data.user.nickName));
  };

  const handleLoseFocus = () => {
    setEditNickName(false);
    setIsEditHover(false);
  };

  useEffect(() => {
    if (!nickNameInputRef.current) return;
    nickNameInputRef.current?.focus();
  }, [isEditHover]);

  useEffect(() => {
    if (!currentUser) return;
    setNickName(currentUser.nickName);
  }, [currentUser]);

  return (
    <div className="flex items-center justify-center gap-1 relative w-full">
      {editNickName ? (
        <form onSubmit={handleSubmitNickName}>
          <input
            onBlur={handleLoseFocus}
            ref={nickNameInputRef}
            type="multiliner"
            defaultValue={nickName}
            className="text-2xl font-bold w-20 pl-2 "
          ></input>
        </form>
      ) : (
        <div className="relative">
          <button
            onMouseLeave={() => setIsEditHover(false)}
            onMouseEnter={() => setIsEditHover(true)}
            onClick={handleEditNickName}
          >
            <p className="text-2xl font-bold text-primary_grey">{nickName}</p>
            {isEditHover ? <IoPencilOutline className="w-4 h-4 absolute top-2 right-[-24%]" /> : null}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileName;
