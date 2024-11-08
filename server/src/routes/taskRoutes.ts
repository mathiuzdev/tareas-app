import express from 'express';
import { getTasks, createTask, getTaskById, updateTask, deleteTask, addLabelToTask, removeLabelFromTask} from '../controllers/taskController';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.post('/tasks/addLabel', addLabelToTask);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.patch('/tasks/removeLabel', removeLabelFromTask);

export default router;