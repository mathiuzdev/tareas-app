import { Request, Response } from "express";
import Tag from "../models/Tag";

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tags" });
  }
};

export const createTag = async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;
    const tag = await Tag.create({ name, color });
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ error: "Error creating tag" });
  }
};

export const getTagById = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching tag" });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      await tag.update({ name, color });
      res.json(tag);
    } else {
      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating tag" });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      await tag.destroy();
      res.json({ message: "Tag deleted" });
    } else {
      res.status(404).json({ error: "Tag not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting tag" });
  }
};
