import Router from "../Router"

import bcrypt from "bcrypt"

import { HttpError } from "../error/classes/HttpError"

import { findUser } from "./actions/findUser"
import { createUser } from "./actions/createUser"
import { deleteUser } from "./actions/deleteUser"

import { validateSchema } from "../schema/middleware/validateSchema"

import { registerBody } from "./schema/registerBody"
import { RegisterBody } from "./types/RegisterBody"

const router = new Router({ prefix: "/users" })

router.post("/", validateSchema(registerBody, "body"), async (ctx, next) => {
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
})

export default router.routes()
