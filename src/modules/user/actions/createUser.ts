import { db } from "../../../../db/knex"

import { User, EditableUser } from "../types/User"

export const createUser = async (user: EditableUser) => {
    const isTaken = Boolean(
        await db<User>("users")
            .select("id")
            .where({ username: user.username })
            .orWhere({ email: user.email })
            .first()
    )
    if (isTaken) return null

    return (await db<User>("users").insert(user, "*"))[0]
}
