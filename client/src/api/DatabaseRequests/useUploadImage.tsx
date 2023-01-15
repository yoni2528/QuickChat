import { useContext } from "react";
import Axios from "axios";

import { UserContext } from "../../store/context";
import { BASE_URL } from "../../config/config";

export type Message = {
  message: string;
  to: string;
  from: string;
  date: number;
};

const useUploadImage = () => {
  const { token, handleStartSpinner } = useContext(UserContext);

  const messageApi = Axios.create({
    baseURL: `${BASE_URL}/app/v1`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  const profileImageUpload = async (image: any) => {
    handleStartSpinner();
    const response = await messageApi.post(`/user/image`, image);
    return response.data;
  };

  return { profileImageUpload };
};

export default useUploadImage;
