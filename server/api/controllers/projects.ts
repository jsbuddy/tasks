import { Request, Response } from 'express';
import * as ProjectService from '../../services/projects';

export const create = async (req: Request, res: Response) => {
    const data = await ProjectService.create(req.body);
    return res.json({ success: true, data })
}

export const findAll = async (_: Request, res: Response) => {
    const data = await ProjectService.findAll();
    return res.json({ success: true, data })
}

export const remove = async (req: Request, res: Response) => {
    const data = await ProjectService.remove(req.params.id);
    return res.json({ success: true, data })
}
