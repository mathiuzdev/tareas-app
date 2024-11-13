import { Request, Response } from "express";
import Task from "../models/Task";
import { Tag, TaskTag } from "../models";
import { TaskRequest } from "../types/requests/TaskRequest";
import { taskSchema } from "../validations/taskValidations";
import { TaskService } from "../services/taskService";
import {
  buildStatusFilter,
  normalizeTagIds,
  buildTagsInclude,
  buildTagsHavingClause,
} from "../utils/taskFilters";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const tagIds = normalizeTagIds(
      req.query.tagId as string | string[] | undefined
    );
    const whereClause = buildStatusFilter(status);

    const tasks = await Task.findAll({
      where: whereClause,
      include: [buildTagsInclude(tagIds)],
      group: ["Task.id"],
      having: buildTagsHavingClause(tagIds),
    });

    const tasksWithAllTags = await TaskService.getTasksWithAllTags(
      tasks.map((task) => task.id)
    );

    res.json(tasksWithAllTags);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({
      errorMessage: "Error getting tasks",
      error,
    });
  }
};

export const createTask = async (
  req: TaskRequest,
  res: Response
): Promise<void> => {
  const { error } = taskSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  try {
    const { title, description, dueDate, status, tags } = req.body;

    if (req.user?.id) {
      const userId = req.user.id;

      const task = await Task.create({
        title,
        description,
        dueDate,
        status,
        userId,
      });

      if (tags && tags.length > 0) {
        const taskTags = tags.map((tagId: number) => ({
          taskId: task.id,
          tagId: tagId,
        }));

        await TaskTag.bulkCreate(taskTags);
      }

      res.status(201).json(task);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Error creating task", error });
  }
};

export const addTagToTask = async (req: Request, res: Response) => {
  try {
    const { tagId, taskId } = req.body;

    if (!tagId || !taskId) {
      res.status(400).json({ error: "Missing data" });
      return;
    }

    const tag = await Tag.findByPk(tagId);
    const task = await Task.findByPk(taskId);

    if (!tag || !task) {
      res.status(404).json({ error: "Tag or task not found" });
      return;
    }

    await TaskTag.create({ taskId, tagId });
    res.json({ message: "Tag added to task" });
  } catch (error) {
    res.status(500).json({ error: "Error adding tag to task" });
  }
};

export const removeTagFromTask = async (req: Request, res: Response) => {
  try {
    const { tagId, taskId } = req.body;

    if (!tagId || !taskId) {
      res.status(400).json({ error: "Missing data" });
      return;
    }

    const tag = await Tag.findByPk(tagId);
    const task = await Task.findByPk(taskId);

    if (!tag || !task) {
      res.status(404).json({ error: "Tag or task not found" });
      return;
    }

    await TaskTag.destroy({ where: { taskId, tagId } });
    res.json({ message: "Tag removed from task" });
  } catch (error) {
    res.status(500).json({ error: "Error removing tag from task" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, status, userId } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update({ title, description, dueDate, status, userId });
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: {
        model: Tag,
        as: "tags",
        through: {
          attributes: [],
        },
      },
    });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    await TaskTag.destroy({ where: { taskId: req.params.id } });

    await task?.destroy();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ errorMessage: "Error deleting task", error });
  }
};
