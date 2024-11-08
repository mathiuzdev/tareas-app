import { Request, Response } from 'express';
import Label from '../models/Label';

export const getLabels = async (req: Request, res: Response) => {
  try {
    const labels = await Label.findAll();
    res.json(labels);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las etiquetas' });
  }
};

export const createLabel = async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;
    const label = await Label.create({ name, color });
    res.status(201).json(label);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la etiqueta' });
  }
};

export const getLabelById = async (req: Request, res: Response) => {
  try {
    const label = await Label.findByPk(req.params.id);
    if (label) {
      res.json(label);
    } else {
      res.status(404).json({ error: 'Etiqueta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la etiqueta' });
  }
};

export const updateLabel = async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;
    const label = await Label.findByPk(req.params.id);
    if (label) {
      await label.update({ name, color });
      res.json(label);
    } else {
      res.status(404).json({ error: 'Etiqueta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la etiqueta' });
  }
};

export const deleteLabel = async (req: Request, res: Response) => {
  try {
    const label = await Label.findByPk(req.params.id);
    if (label) {
      await label.destroy();
      res.json({ message: 'Etiqueta eliminada' });
    } else {
      res.status(404).json({ error: 'Etiqueta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la etiqueta' });
  }
};