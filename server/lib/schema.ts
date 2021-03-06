import Joi from "@hapi/joi";

export const createProjectSchema = Joi.object({
    name: Joi.string().trim().required(),
    deadline: Joi.string().trim().allow(''),
})

export const createTaskSchema = Joi.object({
    name: Joi.string().trim().required(),
    due: Joi.string().trim().required(),
    priority: Joi.number().integer().valid(1, 2, 3, 4).required(),
    project: Joi.string().trim().required(),
})

export const updateTaskSchema = Joi.object({
    name: Joi.string().trim(),
    due: Joi.string().trim(),
    priority: Joi.number().integer().valid(1, 2, 3, 4),
    project: Joi.string().trim(),
    completed: Joi.boolean(),
})

export const createUserSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().min(8).required(),
})

export const loginUserSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
})