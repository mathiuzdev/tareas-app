import express from 'express';
import { getLabels, createLabel, getLabelById, updateLabel, deleteLabel } from '../controllers/labelController';

const router = express.Router();

router.get('/labels', getLabels);
router.post('/labels', createLabel);
router.get('/labels/:id', getLabelById);
router.put('/labels/:id', updateLabel);
router.delete('/labels/:id', deleteLabel);

export default router;