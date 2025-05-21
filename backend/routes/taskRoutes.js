import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import mongoose from 'mongoose';

import { getTasks, createTask, updateTask, deleteTask, deleteAllTasks } from '../controllers/taskController.js';

const router = express.Router();

if (process.env.NODE_ENV !== 'test') {
    router.use(verifyToken);
}
else {
    router.use((req, res, next) => {
        req.user = { id: new mongoose.Types.ObjectId() };
        next();
    });
}

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.delete('/', deleteAllTasks);

export default router;