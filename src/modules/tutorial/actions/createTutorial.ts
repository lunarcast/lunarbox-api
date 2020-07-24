import { db } from "../../../../db/knex"

import { Tutorial, TutorialRaw } from "../types/Tutorial"

export const createTutorial = async (tutorial: Omit<Tutorial, "id">) => {
    const {  hiddenElements } = tutorial

    const rawTutorial = {
        ...tutorial,
        hidden: hiddenElements
    }

    delete rawTutorial.hiddenElements

    const result = (
        await db<TutorialRaw>("tutorials").insert(rawTutorial, "*")
    )[0]

    return result
}
