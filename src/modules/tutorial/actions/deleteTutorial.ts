import { db } from "../../../../db/knex"

import { Tutorial, TutorialRaw } from "../types/Tutorial"

export const deleteTutorial = async (id: Tutorial["id"]) => {
    const result = await db<TutorialRaw>("tutorials").delete("*").where({ id })

    return result
}
