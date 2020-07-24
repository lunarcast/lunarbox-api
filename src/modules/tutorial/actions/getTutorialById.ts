import { db } from "../../../../db/knex"

import { Tutorial, TutorialRaw } from "../types/Tutorial"

export const getTutorialById = async (id: Tutorial["id"]) => {
    const tutorial = await db<TutorialRaw>("tutorials")
        .select()
        .first()
        .where({ id })
    if (!tutorial) return null

    const {  hidden } = tutorial

    return {
        ...tutorial,
        hiddenElements: hidden
    }
}
