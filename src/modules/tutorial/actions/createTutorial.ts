import { db } from "../../../../db/knex"

import { Tutorial } from "../types/Tutorial"

export const createTutorial = async (tutorial: Omit<Tutorial, "id">) => {
    const rawTutorial = {
        ...tutorial,
    }

    const result = (
        await db<Tutorial>("tutorials").insert(rawTutorial, "*")
    )[0]

    return result
}
