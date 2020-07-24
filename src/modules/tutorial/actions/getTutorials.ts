import { db } from "../../../../db/knex"

import { Tutorial, TutorialRaw } from "../types/Tutorial"

export const getTutorials = async () => {
    const rawTutorials = await db<TutorialRaw>("tutorials")

    const tutorials = rawTutorials.map(tut => {
        const {  hidden } = tut

        return {
            ...tut,
            hiddenElements: hidden
        }
    })

    return tutorials
}
