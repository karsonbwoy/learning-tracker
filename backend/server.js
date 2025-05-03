import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Połączono MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`Serwer działa na porcie ${process.env.PORT}`)
    })
}).catch((err) => {
    console.error('Błąd połączenia z MongoDB:', err);
});
