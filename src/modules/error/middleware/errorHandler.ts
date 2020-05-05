import { Middleware } from "koa"

import { HttpError } from "../classes/HttpError"

export const errorHandler = (): Middleware => async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        if (err instanceof HttpError) {
            ctx.status = err.status
            ctx.body = {
                status: err.status,
                message: err.reason
            }

            return
        }

        console.error(err)

        ctx.status = 500
        ctx.body = {
            status: 500,
            message: "Internal Server Error"
        }

        return
    }
}
