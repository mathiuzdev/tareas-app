import express from "express";
import {
  getTags,
  createTag,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tagController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/tags", authenticateJWT, getTags);
router.post("/tags", authenticateJWT, createTag);
router.get("/tags/:id", getTagById);
router.put("/tags/:id", updateTag);
router.delete("/tags/:id", deleteTag);

export default router;
