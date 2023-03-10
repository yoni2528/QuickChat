/* eslint-disable no-console */

import { useMutation } from "react-query";

import useUploadImage from "./useUploadImage";
import useApi from "../ApiRoutes/useApi";
import { useContext } from "react";
import { UserContext } from "../../store/context";
import { useNavigate } from "react-router-dom";
import useAuthApi from "../ApiRoutes/useAuthApi";

const useDatabseRequests = () => {
  const navigate = useNavigate();
  const { getAllUsers, readUserMessages, createMessage, updateUserMessages, updateUserDetails } = useApi();
  const { profileImageUpload } = useUploadImage();

  const { handleStopSpinner, handleSetError } = useContext(UserContext);

  const { signUp, login, getMe } = useAuthApi();

  const onError = (error: any) => {
    if (error.response.data.title === "Token Error") {
      navigate("/login");
      localStorage.removeItem("token");
    }
    handleSetError({ isOpen: true, error: error.response.data.error, title: error.response.data.title });
    console.log(error.response.data.error);
  };

  const handleLogin = useMutation(login, {
    onError,
    onSettled: handleStopSpinner,
  });

  const handleGetMe = useMutation(getMe, {
    onError,
    onSettled: handleStopSpinner,
  });

  const handleSignUp = useMutation(signUp, {
    onError,
    onSettled: handleStopSpinner,
  });

  const handleGetAllUsers = useMutation(getAllUsers, {
    onError,
    onSettled: handleStopSpinner,
  });

  const handleGetAllMessagesForUser = useMutation(readUserMessages, {
    onError,
    onSettled: handleStopSpinner,
  });

  const handleCreateMessage = useMutation(createMessage, {
    onError,
    onSettled: handleStopSpinner,
  });

  const handleUpdateMessageRead = useMutation(updateUserMessages, {
    onError,
    onSettled: handleStopSpinner,
  });

  const handleUploadMessage = useMutation(profileImageUpload, {
    onError,
    onSettled: handleStopSpinner,
  });

  const handleUpdateUserDetails = useMutation(updateUserDetails, {
    onError,
    onSettled: handleStopSpinner,
  });

  return {
    handleLogin,
    handleSignUp,
    handleGetAllUsers,
    handleGetAllMessagesForUser,
    handleCreateMessage,
    handleUpdateMessageRead,
    handleGetMe,
    handleUploadMessage,
    handleUpdateUserDetails,
  };
};

export default useDatabseRequests;
