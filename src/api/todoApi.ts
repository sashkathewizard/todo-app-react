import axios from "axios";
import { BASE_URL } from "../config/access.config";
import { SessionType } from "../core/typing/tokens";
import { getStorage } from "../core/services/storage.services";

export const fetchUserTodos = async () => {
  const accessToken = getStorage(SessionType.AccessToken);
  console.log(`fetch todos access token ${accessToken}`);
  if (!accessToken) {
      throw new Error("Access token is missing");
  }
  try {
    const response = await axios.get(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message || "Failed to fetch todos";
  }
}

export const deleteTodoById = async (id: string) => {
  const accessToken = getStorage(SessionType.AccessToken);
  if (!accessToken) {
      throw new Error("Access token is missing");
  }
  try {
    const response = await axios.delete(`${BASE_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message || "Failed to fetch todos";
  }
}

export const updateTodoStatus = async (id: string, status: string) => {
  const accessToken = getStorage(SessionType.AccessToken);

  await axios.patch(
    `${BASE_URL}/todos/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
}