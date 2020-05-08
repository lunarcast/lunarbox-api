import { db } from "../../../../db/knex"

import { Project } from "../types/Project"

export const saveProject = async (
    id: Project["id"],
    project: Omit<Project, "id">
) => {
    const result = (
        await db<Project>("projects").where({ id }).update(project, "*")
    )[0]

    return result
}
