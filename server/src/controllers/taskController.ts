import { Request, Response } from "express";
import Task from "../models/Task";
import { Label, TaskLabel } from "../models";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();

    const tasksLabel = await TaskLabel.findAll({
      where: { task_id: tasks.map((task) => task.id) },
    });

    const labels = await Label.findAll();

    const tasksWithLabels = tasks.map((task) => {
      const taskLabels = tasksLabel
        .filter((taskLabel) => taskLabel.task_id === task.id)
        .map((taskLabel) => {
          return labels.find((label) => label.id === taskLabel.label_id);
        });
      return { ...task.toJSON(), labels: taskLabels };
    });

    res.json(tasksWithLabels);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, due_date, status, user_id } = req.body;
    const task = await Task.create({
      title,
      description,
      due_date,
      status,
      user_id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ errorMessage: "Error al crear la tarea", error });
  }
};

export const addLabelToTask = async (req: Request, res: Response) => {
  try {
    const { label_id, task_id } = req.body;

    if (!label_id || !task_id) {
      res.status(400).json({ error: "Faltan datos" });
    }

    const label = await Label.findByPk(label_id);
    const task = await Task.findByPk(task_id);

    if (!label || !task) {
      res.status(404).json({ error: "Etiqueta o tarea no encontrada" });
    }

    TaskLabel.create({ task_id, label_id });
    res.json({ message: "Etiqueta añadida a la tarea" });
  } catch (error) {
    res.status(500).json({ error: "Error al añadir la etiqueta a la tarea" });
  }
};

export const removeLabelFromTask = async (req: Request, res: Response) => {
  try {
    const { label_id, task_id } = req.body;

    if (!label_id || !task_id) {
       res.status(400).json({ error: "Faltan datos" }); 
    }

    const label = await Label.findByPk(label_id);
    const task = await Task.findByPk(task_id);

    if (!label || !task) {
       res.status(404).json({ error: "Etiqueta o tarea no encontrada" }); 
    }

   const prueba = await TaskLabel.destroy({ where: { task_id, label_id } });
   console.log(prueba);
   res.json({ message: "Etiqueta eliminada de la tarea" }); 
  } catch (error) {
     res.status(500).json({ error: "Error al eliminar la etiqueta de la tarea" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Tarea no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tarea" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, due_date, status, user_id } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update({ title, description, due_date, status, user_id });
      res.json(task);
    } else {
      res.status(404).json({ error: "Tarea no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      res.status(404).json({ error: "Tarea no encontrada" });
    }

    await TaskLabel.destroy({ where: { task_id: req.params.id } });
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};
