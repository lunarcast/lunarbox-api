import { db } from "../../../../db/knex"

import { Tutorial} from "../types/Tutorial"

export const getTutorialById = async (id: Tutorial["id"]) => {
    const tutorial = await db<Tutorial>("tutorials")
        .select()
        .first()
        .where({ id })

    if (!tutorial) return null

    return tutorial
}
