import express from 'express';
import * as controller from '../controllers/tasks';
import { createValidator } from "express-joi-validation";
import { createTaskSchema, updateTaskSchema } from '../../lib/schema';
import verifyToken from '../../middlewares/verifyToken';

const router = express.Router();
const validator = createValidator()

router.post('/', validator.body(createTaskSchema), verifyToken, controller.create);
router.patch('/:id', validator.body(updateTaskSchema), verifyToken, controller.update);
router.delete('/:id', verifyToken, controller.remove);

export default router;
