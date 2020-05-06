import Joi from "@hapi/joi"

export const registerBody = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(2).max(32).alphanum().required(),
    password: Joi.string()
        .required()
        .min(8)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"))
})
