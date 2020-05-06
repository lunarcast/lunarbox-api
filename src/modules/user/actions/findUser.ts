import { db } from "../../../../db/knex"

import { User } from "../types/User"

export const findUser = async <T extends keyof Omit<User, "password">>(
    property: T,
    value: User[T]
) => {
    const result = await db<User>("users")
        .select()
        .first()
        .where({ [property]: value })
    if (!result) return null

    return result
}
