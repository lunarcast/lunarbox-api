import Router from "../Router"

import bcrypt from "bcrypt"

import { HttpError } from "../error/classes/HttpError"

import { findUser } from "../user/actions/findUser"

import { validateSchema } from "../schema/middleware/validateSchema"

import { loginBody } from "./schema/loginBody"
import { LoginBody } from "./types/LoginBody"

import { requireAuthenticated } from "./middleware/requireAuthenticated"
import { requireUnauthenticated } from "./middleware/requireUnauthenticated"

const router = new Router({ prefix: "/auth" })

router.post(
    "/login",
    requireUnauthenticated(),
    validateSchema(loginBody, "body"),
    async (ctx, next) => {
        const { email, password } = ctx.request.body as LoginBody

        const session = ctx.session!

        const user = await findUser("email", email)
        if (!user)
            throw new HttpError(
                400,
                "There seems to be no user with that email"
            )

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) throw new HttpError(400, "The password seems to be wrong")

        session.user = user.id
        ctx.status = 200
        ctx.body = {
            status: 200,
            message: "Successfully log in",
            user: { username: user.username, isAdmin: user.admin }
        }

        await next()
    }
)

router.get("/logout", requireAuthenticated(), async (ctx, next) => {
    ctx.session = null

    ctx.status = 200
    ctx.body = { status: 200, message: "Successfully log out" }

    await next()
})

export default router.routes()
