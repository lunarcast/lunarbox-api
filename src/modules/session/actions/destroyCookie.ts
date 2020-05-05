import { db } from "../../../../db/knex"

import { Session } from "../types/Session"

export const destroyCookie = async (key: Session["key"]) =>
    db<Session>("sessions").where({ key }).del("*")
