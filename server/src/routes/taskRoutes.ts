import express from "express";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  addTagToTask,
  removeTagFromTask,
} from "../controllers/taskController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/tasks", authenticateJWT, getTasks);
router.post("/tasks", authenticateJWT, createTask);
router.post("/tasks/addTag", authenticateJWT, addTagToTask);
router.get("/tasks/:id", authenticateJWT, getTaskById);
router.put("/tasks/:id", authenticateJWT, updateTask);
router.delete("/tasks/:id", authenticateJWT, deleteTask);
router.patch("/tasks/removeTag", authenticateJWT, removeTagFromTask);

export default router;
