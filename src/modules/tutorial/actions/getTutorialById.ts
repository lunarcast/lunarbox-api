import { db } from "../../../../db/knex"

import { Tutorial } from "../types/Tutorial"

export const getTutorialById = async (id: Tutorial["id"]) => {
    const tutorials = await db<Tutorial>("tutorials")
        .select()
        .first()
        .where({ id })
    if (!tutorials) return null

    return tutorials
}
