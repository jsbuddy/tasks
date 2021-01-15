import { Request, Response } from 'express';
import * as UserService from '../../services/user';
import jwt from 'jsonwebtoken';
import '../../config/env';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await UserService.create(req.body);
        user.set('password', undefined);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '');
        return res.status(200).json({ success: true, data: user, token });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const login = async (req: Request, res: Response) => {
    const user = await UserService.findByEmail(req.body.email);
    if (!user) return res.status(400).json({ success: false, message: 'Invalid login' });
    if (!user.comparePasswords(req.body.password)) {
        return res.status(400).json({ success: false, message: 'Invalid login' })
    };
    user.set('password', undefined);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '');
    return res.json({ success: true, data: user, token })
}

export const getUser = async (_: Request, res: Response) => {
    const id = res.locals.decoded.id;
    const user = await UserService.findById(id);
    return res.json({ success: true, data: user });
}
