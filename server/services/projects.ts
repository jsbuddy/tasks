import Project from '../models/project';

interface IProject {
    name: String,
    deadline?: String
}

export const create = (data: IProject) => {
    return Project.create(data);
}

export const findAll = () => {
    return Project.find();
}

export const remove = (id: String) => {
    return Project.findByIdAndRemove(id);
}
