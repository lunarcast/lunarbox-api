import { db } from "../../../../db/knex"

import { Session } from "../types/Session"

export const getCookie = async (key: Session["key"]) => {
    const cookie = await db<Session>("sessions")
        .where({ key })
        .select("key", "maxAge", "session")
        .first()

    if (!cookie) return null
    return cookie.session
}
