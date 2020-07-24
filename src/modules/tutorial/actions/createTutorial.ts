import { db } from "../../../../db/knex"

import { Tutorial, TutorialRaw } from "../types/Tutorial"

export const createTutorial = async (tutorial: Omit<Tutorial, "id">) => {
    const {  hiddenElements } = tutorial

    const rawTutorial = {
        ...tutorial,
        hiddenElements:undefined,
        hidden: hiddenElements
    }

    console.log(rawTutorial);
    

    const result = (
        await db<TutorialRaw>("tutorials").insert(rawTutorial, "*")
    )[0]

    return result
}
