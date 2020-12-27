import { Request, Response } from 'express';
import * as ProjectService from '../../services/projects';
import * as TaskService from '../../services/tasks';

export const create = async (req: Request, res: Response) => {
    const data = await ProjectService.create(req.body);
    return res.json({ success: true, data })
}

export const find = async (req: Request, res: Response) => {
    const data = await ProjectService.find(req.params.id);
    console.log(req.params.id, { data });
    return res.json({ success: true, data })
}

export const findAll = async (_: Request, res: Response) => {
    const data = await ProjectService.findAll();
    return res.json({ success: true, data })
}

export const findProjectTasks = async (req: Request, res: Response) => {
    const data = await TaskService.findByProject(req.params.id);
    return res.json({ success: true, data })
}

export const remove = async (req: Request, res: Response) => {
    const data = await ProjectService.remove(req.params.id);
    TaskService.removeByProject(req.params.id);
    return res.json({ success: true, data })
}
