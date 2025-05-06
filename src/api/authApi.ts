import axios from "axios";
import { BASE_URL } from "../config/access.config";
import { setStorage } from "../core/services/storage.services";
import { SessionType } from "../core/typing/tokens";


export const loginUser = async (email: string, password: string) => {
  console.log('data', email, password);

  const response = await axios.post(`${BASE_URL}/users/login`, { email, password });
  console.log("Login successful", response.data);
  setStorage(SessionType.AccessToken, response.data.access_token);
  setStorage(SessionType.RefreshToken, response.data.refresh_token);
};

export const signUpUser = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      name,
      email,
      password
    });

    if (response.status !== 201) {
      throw new Error("Signup failed");
    }

    setStorage(SessionType.AccessToken, response.data.accessToken);
    setStorage(SessionType.RefreshToken, response.data.refreshToken);

    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message || "Signup failed";
  }
};