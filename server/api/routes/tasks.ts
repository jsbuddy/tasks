import express from 'express';
import * as controller from '../controllers/tasks';
import { createValidator } from "express-joi-validation";
import { createTaskSchema, updateTaskSchema } from '../../lib/schema';

const router = express.Router();
const validator = createValidator()

router.post('/', validator.body(createTaskSchema), controller.create);
router.patch('/:id', validator.body(updateTaskSchema), controller.update);
router.delete('/:id', controller.remove);

export default router;
