import express from 'express';
import * as controller from '../controllers/projects';
import { createProjectSchema } from "../../lib/schema";
import { createValidator } from "express-joi-validation";
import verifyToken from '../../middlewares/verifyToken';

const router = express.Router();
const validator = createValidator()

router.post('/', validator.body(createProjectSchema), verifyToken, controller.create);
router.get('/', verifyToken, controller.findAll);
router.get('/:id/', verifyToken, controller.find);
router.get('/:id/tasks', verifyToken, controller.findProjectTasks);
router.delete('/:id', verifyToken, controller.remove);

export default router;
