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

const useApi = () => {
  const { token, handleStartSpinner } = useContext(UserContext);

  const messageApi = Axios.create({
    baseURL: `${BASE_URL}/app/v1`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const getAllUsers = async () => {
    handleStartSpinner();

    const response = await messageApi.get("/user");
    return response.data;
  };

  const createMessage = async (Message: Message) => {
    const response = await messageApi.post("/chat", Message);
    return response.data;
  };

  const readUserMessages = async (userId: string) => {
    handleStartSpinner();
    const response = await messageApi.get(`/chat/${userId}`);
    return response.data;
  };

  const updateUserMessages = async (userId: string) => {
    handleStartSpinner();
    const response = await messageApi.patch(`/chat/${userId}`);
    return response.data;
  };

  const deleteMessage = async (messageId: string) => {
    handleStartSpinner();
    const response = await messageApi.delete(`/chat/${messageId}`);
    return response.data;
  };

  const profileImageUpload = async (image: any) => {
    handleStartSpinner();
    const response = await messageApi.post(`/user/image`, image);
    return response.data;
  };

  const updateUserDetails = async (data: any) => {
    handleStartSpinner();
    const response = await messageApi.patch(`/user`, data);
    return response.data;
  };

  return {
    createMessage,
    readUserMessages,
    deleteMessage,
    getAllUsers,
    updateUserMessages,
    profileImageUpload,
    updateUserDetails,
  };
};

export default useApi;
