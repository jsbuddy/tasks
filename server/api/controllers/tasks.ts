import { Request, Response } from 'express';
import * as TaskService from '../../services/tasks';

export const create = async (req: Request, res: Response) => {
    const data = await TaskService.create(req.body);
    res.status(200).json({ success: true, data });
}

export const update = async (req: Request, res: Response) => {
    const data = await TaskService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data });
}

export const remove = async (req: Request, res: Response) => {
    const data = await TaskService.remove(req.params.id);
    res.status(200).json({ success: true, data });
}
