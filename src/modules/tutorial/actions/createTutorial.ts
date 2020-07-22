import { db } from "../../../../db/knex"

import { Tutorial, TutorialRaw } from "../types/Tutorial"

export const createTutorial = async (tutorial: Omit<Tutorial, "id">) => {
    const { requires, hiddenElements } = tutorial

    const rawTutorial = {
        ...tutorial,
        requires: JSON.stringify(requires),
        hidden: hiddenElements
    }

    const result = (
        await db<TutorialRaw>("tutorials").insert(rawTutorial, "*")
    )[0]

    return result
}
