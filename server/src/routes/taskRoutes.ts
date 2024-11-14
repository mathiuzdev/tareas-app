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
/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operations related to tasks
 */
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Returns a list of all tasks.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks list retrieved successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get("/tasks", authenticateJWT, getTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Allows you to create a new task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.post("/tasks", authenticateJWT, createTask);

/**
 * @swagger
 * /tasks/addTag:
 *   post:
 *     summary: Add a tag to a task
 *     description: Allows you to add a tag to an existing task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               tag:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tag added successfully to the task.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.post("/tasks/addTag", authenticateJWT, addTagToTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Returns the details of a specific task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details retrieved successfully.
 *       404:
 *         description: Task not found.
 *       401:
 *         description: Unauthorized.
 */
router.get("/tasks/:id", authenticateJWT, getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     description: Allows you to update the details of an existing task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Task not found.
 *       401:
 *         description: Unauthorized.
 */
router.put("/tasks/:id", authenticateJWT, updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     description: Allows you to delete a specific task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 *       401:
 *         description: Unauthorized.
 */
router.delete("/tasks/:id", authenticateJWT, deleteTask);

/**
 * @swagger
 * /tasks/removeTag:
 *   patch:
 *     summary: Remove a tag from a task
 *     description: Allows you to remove a tag from an existing task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               tag:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tag successfully removed from the task.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.patch("/tasks/removeTag", authenticateJWT, removeTagFromTask);

export default router;
