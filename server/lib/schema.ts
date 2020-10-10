import Joi from "@hapi/joi";

export const createProjectSchema = Joi.object({
    name: Joi.string().trim().required()
})