import { db } from "../../../../db/knex"

import { User, EditableUser } from "../types/User"

type Taken = "username" | "email"

export const createUser = async (user: EditableUser) => {
    const isTakenUsername = Boolean(
        await db<User>("users")
            .select("id")
            .where({ username: user.username })
            .first()
    )
    if (isTakenUsername) return "username" as Taken
    const isTakenEmail = Boolean(
        await db<User>("users")
            .select("id")
            .where({ email: user.email })
            .first()
    )
    if (isTakenEmail) return "email" as Taken

    return (await db<User>("users").insert(user, "*"))[0]
}
