import Joi from "@hapi/joi"

export const projectBody = Joi.object({
    name: Joi.string().min(2).max(48).required(),
    description: Joi.string().max(2048).optional(),
    isExample: Joi.boolean(),
    visible: Joi.boolean(),
    project: Joi.object().required(),
    metadata: Joi.object().required()
})
