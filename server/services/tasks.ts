import mongoose from "mongoose";
import TaskModel, { Task } from "../models/task";

export const create = (data: Task) => {
    return TaskModel.create(data);
}

export const findByProject = (project: string, user: string) => {
    return TaskModel.find({ project, user });
}

export const update = (id: string, user: string, data: Task) => {
    return TaskModel.findOneAndUpdate({ _id: id, user }, data, { new: true });
}

export const remove = (id: string, user: string) => {
    return TaskModel.findOneAndRemove({ _id: id, user });
}

export const removeByProject = (project: string, user: string) => {
    return TaskModel.deleteMany({ project: mongoose.Types.ObjectId(project), user });
}