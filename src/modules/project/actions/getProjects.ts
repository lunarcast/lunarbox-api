import { db } from "../../../../db/knex"

import { User } from "../../user/types/User"
import { Project } from "../types/Project"

export const getProjects = async (id: User["id"]) => {
    const exampleProjects = await db<Project>("projects")
        .select(["id", "name", "project", "metada"])
        .where({ example: true })

    const userProjects = await db<Project>("projects")
        .select(["id", "name", "project", "metadata"])
        .where({ owner: id })

    return { exampleProjects, userProjects }
}
