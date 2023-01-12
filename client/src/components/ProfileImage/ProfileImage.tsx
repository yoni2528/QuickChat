import React, { useState, useContext, useEffect } from "react";

import { UserContext } from "../../store/context";

import { IoCameraOutline } from "react-icons/io5";

import useDatabseRequests from "../../api/DatabaseRequests/useDatabseRequests";
import ProfileName from "../ProfileName/ProfileName";
import { BASE_URL } from "../../config/config";

const ProfileImage = () => {
  const [isImageHover, setIsImageHover] = useState(true);
  const [userImage, setUserImage] = useState<string>();

  const { currentUser } = useContext(UserContext);

  const { handleUploadMessage } = useDatabseRequests();

  const onHover = () => {
    setIsImageHover(true);
  };
  const onBlur = () => {
    setIsImageHover(false);
  };

  const handleMessageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (!e.target.files) return;
    const image = e.target.files[0];
    formData.append("image", image);
    handleUploadMessage.mutateAsync(formData).then((data) =>
      setTimeout(() => {
        setUserImage(data.data.image);
      }, 2000)
    );
  };

  useEffect(() => {
    if (!currentUser) return;

    setUserImage(currentUser.image);
  }, [currentUser]);

  return (
    <>
      {userImage && (
        <div
          onMouseEnter={onHover}
          onMouseLeave={onBlur}
          className="w-28 h-28 bg-cover rounded-[50%] mt-20 realtive "
          style={{
            backgroundImage: `url(${BASE_URL}/${userImage})`,
          }}
        >
          <div onMouseEnter={onHover} className={` ${isImageHover ? "visible" : "invisible"}`}>
            <IoCameraOutline className=" absolute top-[23%] left-[43%] w-10 h-10 text-[white]" />
            <input onChange={handleMessageUpload} className="file-upload top-[23%] left-[43%]" type={"file"}></input>
          </div>
        </div>
      )}
      <ProfileName />
    </>
  );
};

export default ProfileImage;
