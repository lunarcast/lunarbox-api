import { db } from "../../../../db/knex"

import { Project } from "../types/Project"

export const toggleExample = async (id: Project["id"]) => {
    const isExample = (
        await db<Project>("projects").select("example").where({ id })
    )[0].example

    const result = (
        await db<Project>("projects").update({ example: !isExample }, "*")
    )[0]

    return result
}
