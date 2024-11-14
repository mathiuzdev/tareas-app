import { useState, useEffect } from "react";
import { Task, TaskFilters } from "../types/task";
import { getTasks, deleteTask, updateTaskStatus } from "../services/task";
import { Tag } from "../types";

export const useTasks = (filters: TaskFilters) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { status, tags } = filters as { status: string; tags: Tag[] };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await getTasks({ status, tags });
        setTasks(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch tasks");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [status, tags]);

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      return true;
    } catch (err) {
      setError("Failed to delete task");
      console.error("Failed to delete task:", err);
      return false;
    }
  };

  const handleCompleteTask = async (id: string) => {
    try {
      const updatedTask = await updateTaskStatus(id, "completed");
      if (updatedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, status: "completed" } : task
          )
        );
      }
      return updatedTask;
    } catch (err) {
      setError("Failed to complete task");
      console.error("Failed to complete task:", err);
      return null;
    }
  };

  return {
    tasks,
    loading,
    error,
    handleDeleteTask,
    handleCompleteTask,
  };
};
