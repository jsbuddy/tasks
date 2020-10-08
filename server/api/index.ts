import { Router } from 'express';
import tasks from './routes/tasks';

const router = Router();

router.use('/tasks', tasks);

export default router;
