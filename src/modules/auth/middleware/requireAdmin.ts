import { Middleware, DefaultState, Context } from "koa"

import { HttpError } from "../../error/classes/HttpError"

import { User } from "../../user/types/User"

import { findUser } from "../../user/actions/findUser"

export const requireAdmin = (): Middleware<DefaultState, Context> => async (
    ctx,
    next
) => {
    const session = ctx.session!
    const userId: User["id"] = session.user

    const user = await findUser("id", userId)

    if (user?.admin) {
        throw new HttpError(401, "You don't seem to be an admin")
    }
    ctx.session = session

    await next()
}
