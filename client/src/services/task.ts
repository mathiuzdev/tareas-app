import { Tag, Task } from "../types";
import api from "./api";
import Cookies from "js-cookie";

const getAuthToken = (): string | null => {
  return Cookies.get("token") ?? null;
};

export const getTasks = async (filters?: {
  status?: string;
  tags?: Tag[];
}): Promise<Task[]> => {
  const token = getAuthToken();
  const params = {
    ...(filters?.status && { status: filters.status }),
    ...(filters?.tags?.length && {
      tagId: filters.tags.map((tag) => tag.id),
    }),
  };

  try {
    const { data } = await api.get<Task[]>("/api/tasks", {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export const createTask = async (
  task: Omit<Task, "id" | "userId" | "createdAt" | "updatedAt"> & {
    tags: number[];
  }
): Promise<Task> => {
  const token = getAuthToken();

  try {
    const { data } = await api.post<Task>("/api/tasks", task, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return data;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  const token = getAuthToken();

  try {
    await api.delete(`/api/tasks/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
};

export const updateTaskStatus = async (
  id: string,
  status: Task["status"]
): Promise<Task> => {
  const token = getAuthToken();

  try {
    const { data } = await api.put<Task>(
      `/api/tasks/${id}`,
      { status },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    return data;
  } catch (error) {
    console.error("Failed to update task status:", error);
    throw error;
  }
};
