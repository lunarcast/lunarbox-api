import { db } from "../../../../db/knex"

import { Project } from "../types/Project"

export const createProject = async (project: Omit<Project, "id">) => {
    const result = (await db<Project>("projects").insert(project, "*"))[0]

    return result
}
