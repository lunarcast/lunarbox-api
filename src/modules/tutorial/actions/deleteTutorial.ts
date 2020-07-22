import { db } from "../../../../db/knex"

import { Tutorial } from "../types/Tutorial"

export const deleteTutorial = async (id: Tutorial["id"]) => {
    const result = await db<Tutorial>("tutorials").delete("*").where({ id })

    return result
}
