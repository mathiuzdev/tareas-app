import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  register,
} from "../controllers/userController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users", authenticateJWT, getUsers);
router.get("/users/:id", authenticateJWT, getUserById);
router.put("/users/:id", authenticateJWT, updateUser);
router.delete("/users/:id", authenticateJWT, deleteUser);
router.post("/user/login", login);
router.post("/user/register", register);

export default router;
