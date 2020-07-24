import Joi from "@hapi/joi"

export const tutorialBody = Joi.object({
    name: Joi.string().min(2).max(48).required(),
    base: Joi.number().required(),
    solution: Joi.number().required(),
    hiddenElements: Joi.array().required(),
    content:Joi.string().required(),
})
