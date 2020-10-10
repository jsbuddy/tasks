import { Router } from 'express';
import projects from './routes/projects';
import tasks from './routes/tasks';

const router = Router();

router.use('/tasks', tasks);
router.use('/projects', projects);

export default router;
