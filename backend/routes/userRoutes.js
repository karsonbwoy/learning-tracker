import express from 'express';
import { register, login, logout, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', verifyToken, getUser)
router.post('/updateuser', verifyToken, updateUser)
router.post('/deleteuser', verifyToken, deleteUser)


export default router;