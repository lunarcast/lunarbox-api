import { db } from "../../../../db/knex"

import { Project } from "../types/Project"

export const getProjectById = async (id: Project["id"]) => {
    const project = await db<Project>("projects").select().first().where({ id })
    if (!project) return null

    const { example, ...proj } = project

    return { ...proj, isExample: project.example }
}
