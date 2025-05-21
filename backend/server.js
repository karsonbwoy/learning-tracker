import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL
const app = express();

app.use(cors({
    origin: CLIENT_URL, // Replace with your frontend's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(cookieParser());
app.use('/tasks', taskRoutes);
app.use('/auth', userRoutes)

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Połączono MongoDB');
        app.listen(process.env.PORT, () => {
            console.log(`Serwer działa na porcie ${process.env.PORT}`)
        })
    }).catch((err) => {
        console.error('Błąd połączenia z MongoDB:', err);
    });
}

export default app;