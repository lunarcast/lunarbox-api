import { db } from "../../../../db/knex"

import { Tutorial } from "../types/Tutorial"

export const getTutorials = async () => {
    const rawTutorials = await db<Tutorial>("tutorials")

    return rawTutorials
}