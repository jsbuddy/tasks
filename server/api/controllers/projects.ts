import { Request, Response } from 'express';
import * as ProjectService from '../../services/projects';
import * as TaskService from '../../services/tasks';

export const create = async (req: Request, res: Response) => {
    const user = res.locals.decoded.id;
    const data = await ProjectService.create({ ...req.body, user });
    return res.json({ success: true, data })
}

export const find = async (req: Request, res: Response) => {
    const user = res.locals.decoded.id;
    const data = await ProjectService.find(req.params.id, user);
    return res.json({ success: true, data })
}

export const findAll = async (_: Request, res: Response) => {
    const user = res.locals.decoded.id;
    const data = await ProjectService.findAll(user);
    return res.json({ success: true, data })
}

export const findProjectTasks = async (req: Request, res: Response) => {
    const user = res.locals.decoded.id;
    const data = await TaskService.findByProject(req.params.id, user);
    return res.json({ success: true, data })
}

export const remove = async (req: Request, res: Response) => {
    const user = res.locals.decoded.id;
    const data = await ProjectService.remove(req.params.id, user);
    TaskService.removeByProject(req.params.id, user);
    return res.json({ success: true, data })
}
