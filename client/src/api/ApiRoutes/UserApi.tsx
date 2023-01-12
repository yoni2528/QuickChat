import Axios from "axios";

import { BASE_URL } from "../../config/config";

const userApi = Axios.create({
  baseURL: `${BASE_URL}/app/v1`,
});

export const signUp = async (userSignup: any) => {
  const response = await userApi.post("/user/signup", userSignup);
  return response.data;
};

export const login = async (userLogin: any) => {
  const response = await userApi.post("/user/login", userLogin);
  return response.data;
};

export const getMe = async (token: any) => {
  const response = await userApi.get("/user/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default userApi;
