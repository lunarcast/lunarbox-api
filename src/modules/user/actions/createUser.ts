import { db } from "../../../../db/knex"

import { User, EditableUser } from "../types/User"

export const createUser = async (user: EditableUser) =>
    (await db<User>("users").insert(user, "*"))[0]
