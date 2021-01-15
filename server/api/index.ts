import { Router } from 'express';
import projects from './routes/projects';
import tasks from './routes/tasks';
import user from './routes/user';

const router = Router();

router.use('/tasks', tasks);
router.use('/projects', projects);
router.use('/user', user);

export default router;
