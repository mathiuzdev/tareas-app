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
/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Operations related to tags
 */
/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     description: Returns a list of all tags.
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tags list retrieved successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get("/tags", authenticateJWT, getTags);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     description: Allows you to create a new tag.
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the tag.
 *     responses:
 *       201:
 *         description: Tag created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */
router.post("/tags", authenticateJWT, createTag);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Get a tag by ID
 *     description: Returns the details of a specific tag.
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tag to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag details retrieved successfully.
 *       404:
 *         description: Tag not found.
 *       401:
 *         description: Unauthorized.
 */
router.get("/tags/:id", getTagById);

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Update a tag by ID
 *     description: Allows you to update the details of an existing tag.
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tag to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the tag.
 *     responses:
 *       200:
 *         description: Tag updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Tag not found.
 *       401:
 *         description: Unauthorized.
 */
router.put("/tags/:id", updateTag);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Delete a tag by ID
 *     description: Allows you to delete a specific tag.
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tag to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tag deleted successfully.
 *       404:
 *         description: Tag not found.
 *       401:
 *         description: Unauthorized.
 */
router.delete("/tags/:id", deleteTag);

export default router;
