import { db } from "../../../../db/knex"

import { User } from "../types/User"

export const deleteUser = (userId: User["id"]) =>
    db<User>("users").del("*").where({ id: userId })
