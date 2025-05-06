import express from 'express';
import { verifyToken } from '../middleware/auth.js';

import { getTasks, createTask, updateTask, deleteTask, deleteAllTasks } from '../controllers/taskController.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.delete('/', deleteAllTasks);

export default router;