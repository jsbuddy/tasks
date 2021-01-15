import express from 'express';
import * as controller from '../controllers/user';
import { createValidator } from "express-joi-validation";
import { createUserSchema, loginUserSchema } from '../../lib/schema';
import verifyToken from '../../middlewares/verifyToken';

const router = express.Router();
const validator = createValidator()

router.post('/register', validator.body(createUserSchema), controller.register);
router.post('/login', validator.body(loginUserSchema), controller.login);
router.get('/', verifyToken, controller.getUser);

export default router;
