import { db } from "../../../../db/knex"

import { Tutorial } from "../types/Tutorial"
import { User } from "../../user/types/User"

interface CompletedTutorial {
    id: number
    tutorial: Tutorial["id"]
    user: User["id"]
}

export const completeTutorial = async (
    tutorialId: Tutorial["id"],
    userId: User["id"]
) => {
    const result = (
        await db<CompletedTutorial>("completed-tutorials").insert({
            tutorial: tutorialId,
            user: userId
        })
    )[0]

    return result
}
