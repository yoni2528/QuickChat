import React, { useContext } from "react";
import Axios from "axios";

import { BASE_URL } from "../../config/config";
import { UserContext } from "../../store/context";

const useAuthApi = () => {
  const { handleStartSpinner } = useContext(UserContext);

  const userApi = Axios.create({
    baseURL: `${BASE_URL}/app/v1`,
  });

  const signUp = async (userSignup: any) => {
    handleStartSpinner();
    const response = await userApi.post("/user/signup", userSignup);
    return response.data;
  };

  const login = async (userLogin: any) => {
    handleStartSpinner();
    const response = await userApi.post("/user/login", userLogin);
    return response.data;
  };

  const getMe = async (token: any) => {
    handleStartSpinner();
    const response = await userApi.get("/user/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  return { login, signUp, getMe };
};

export default useAuthApi;
