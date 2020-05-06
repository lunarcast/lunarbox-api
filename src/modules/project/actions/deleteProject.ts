import { db } from "../../../../db/knex"

import { Project } from "../types/Project"

export const deleteProject = async (id: Project["id"]) => {
    const result = await db<Project>("projects").delete("*").where({ id })

    return result
}
