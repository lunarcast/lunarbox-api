import { db } from "../../../../db/knex"

import { Tutorial, TutorialRaw } from "../types/Tutorial"

export const saveTutorial = async (
    id: Tutorial["id"],
    tutorial: Omit<Tutorial, "id">
) => {
    const { requires, hiddenElements } = tutorial

    const rawTutorial = {
        ...tutorial,
        requires: JSON.stringify(requires),
        hidden: hiddenElements
    }

    const result = (
        await db<TutorialRaw>("tutorials")
            .where({ id })
            .update(rawTutorial, "*")
    )[0]

    return result
}
