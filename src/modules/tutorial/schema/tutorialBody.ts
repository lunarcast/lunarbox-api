import Joi from "@hapi/joi"

export const tutorialBody = Joi.object({
    name: Joi.string().min(2).max(48).required(),
    base: Joi.string().required(),
    requires: Joi.array().items(Joi.string).required(),
    solution: Joi.string().required(),
    steps: Joi.object().required(),
    hiddenElements: Joi.object(),
    completed: Joi.boolean().optional()
})
