import Router from "../Router"

import bcrypt from "bcrypt"

import { HttpError } from "../error/classes/HttpError"

import { findUser } from "./actions/findUser"
import { createUser } from "./actions/createUser"
import { deleteUser } from "./actions/deleteUser"

import { validateSchema } from "../schema/middleware/validateSchema"

import { registerBody } from "./schema/registerBody"
import { RegisterBody } from "./types/RegisterBody"

import { requireAuthenticated } from "../auth/middleware/requireAuthenticated"
import { requireUnauthenticated } from "../auth/middleware/requireUnauthenticated"

const router = new Router({ prefix: "/users" })

router.get("/", requireAuthenticated(), async (ctx, next) => {
    const userId = ctx.session!.user

    const user = await findUser("id", userId)
    if (!user) {
        throw new HttpError(404, "There seems to be no user with that id.")
    }

    const { email, username, admin } = user

    ctx.status = 200
    ctx.body = { user: { email, username, isAdmin: admin } }

    await next()
})

router.post(
    "/",
    requireUnauthenticated(),
    validateSchema(registerBody, "body"),
    async (ctx, next) => {
        const { email, username, password } = ctx.request.body as RegisterBody

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await createUser({
            email,
            username,
            password: hashedPassword
        })
        if (!user) {
            throw new HttpError(400, "That Username seems to be already taken")
        }

        ctx.status = 201
        ctx.body = { status: 201, message: "Successfully created" }

        await next()
    }
)

router.delete("/", requireAuthenticated(), async (ctx, next) => {
    const userId = ctx.session!.user as number

    await deleteUser(userId)

    ctx.status = 200
    ctx.body = { status: 200, message: "Successfully deleted user account" }

    await next()
})

export default router.routes()
