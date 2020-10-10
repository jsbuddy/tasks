import express from 'express';
import * as controller from '../controllers/projects';
import { createProjectSchema } from "../../lib/schema";
import { createValidator } from "express-joi-validation";

const router = express.Router();
const validator = createValidator()

router.post('/', validator.body(createProjectSchema), controller.create);
router.get('/', controller.findAll);
router.delete('/:id', controller.remove);

export default router;
