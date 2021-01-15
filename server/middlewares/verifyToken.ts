import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { NextFunction } from "express";
import '../config/env';

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers['authorization']) return res.status(403).json({ success: false, message: 'No authorization token provided' });
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        res.locals.decoded = decoded;
        next()
    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid authorization token' });
    }
}