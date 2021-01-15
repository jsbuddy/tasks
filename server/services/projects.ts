import ProjectModel, { Project } from '../models/project';

export const create = async (data: Project) => {
    const project = await ProjectModel.create(data)
    return project
        .populate('completedTasksCount')
        .populate('pendingTasksCount')
        .execPopulate();
}

export const find = (id: string, user: string) => {
    return ProjectModel.findOne({ _id: id, user })
        .populate('completedTasksCount')
        .populate('pendingTasksCount');
}

export const findAll = (user: string) => {
    return ProjectModel.find({ user })
        .populate('completedTasksCount')
        .populate('pendingTasksCount');
}

export const remove = (id: string, user: string) => {
    return ProjectModel.findOneAndRemove({ _id: id, user });
}
