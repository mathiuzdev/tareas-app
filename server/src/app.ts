import express from 'express';
import { userRoutes, taskRoutes, labelRoutes } from './routes/index';

const app = express();
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);
app.use('/api', labelRoutes);

export default app;
