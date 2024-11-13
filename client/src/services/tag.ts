import { Tag } from "../types";
import api from "./api";
import Cookies from "js-cookie";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const response = await api.get<Tag[]>("/api/tags", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
};

export const createTag = async (
  tag: Omit<Tag, "id" | "createdAt" | "updatedAt">
): Promise<Tag> => {
  try {
    const response = await api.post<Tag>("/api/tags", tag, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error;
  }
};
