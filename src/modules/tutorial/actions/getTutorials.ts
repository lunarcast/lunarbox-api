import { db } from "../../../../db/knex"

import { Tutorial } from "../types/Tutorial"

export const getTutorials = async () => {
    const tutorials = await db<Tutorial>("tutorials")

    return tutorials
}
