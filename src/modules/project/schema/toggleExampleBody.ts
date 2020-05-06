import Joi from "@hapi/joi"

export const exampleBody = Joi.object({
    id: Joi.number()
})
