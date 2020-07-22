import { db } from "../../../../db/knex"

import { Tutorial } from "../types/Tutorial"

export const createTutorial = async (tutorial: Omit<Tutorial, "id">) => {
    const result = (await db<Tutorial>("tutorials").insert(tutorial, "*"))[0]

    return result
}
