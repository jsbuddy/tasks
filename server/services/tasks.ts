import mongoose from "mongoose";
import Task from "../models/task";

interface ITask {
    name: String,
    due: Date,
    priority: Number,
    project: String
}

interface IUpdateTask {
    name?: String,
    due?: Date,
    priority?: Number,
}

export const create = (data: ITask) => {
    return Task.create(data);
}

export const findByProject = (project: string) => {
    return Task.find({ project });
}

export const update = (id: string, data: IUpdateTask) => {
    return Task.findByIdAndUpdate(id, data, { new: true });
}

export const remove = (id: string) => {
    return Task.findByIdAndRemove(id);
}

export const removeByProject = (project: string) => {
    return Task.deleteMany({ project: mongoose.Types.ObjectId(project) });
}