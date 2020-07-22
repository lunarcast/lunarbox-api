import { db } from "../../../../db/knex"

import { Tutorial } from "../types/Tutorial"

export const saveTutorial = async (
    id: Tutorial["id"],
    tutorial: Omit<Tutorial, "id">
) => {
    const result = (
        await db<Tutorial>("tutorials").where({ id }).update(tutorial, "*")
    )[0]

    return result
}
