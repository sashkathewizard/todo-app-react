import axios from "axios";
import { BASE_URL } from "../config/access.config";
import { SessionType } from "../typing/tokens";
import { setStorage } from "../core/services/storage.services";


export const loginUser = async (username: string, password: string) => {
  console.log('data', username, password);

  const response = await axios.post(`${BASE_URL}/users/login`, { username, password });
  console.log("Login successful", response.data);
  setStorage(SessionType.AccessToken, response.data.accessToken);
  setStorage(SessionType.RefreshToken, response.data.refreshToken);
};
