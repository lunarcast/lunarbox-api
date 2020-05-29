import { db } from "../../../../db/knex"

import { User } from "../../user/types/User"
import { Project } from "../types/Project"

export const getProjects = async (id: User["id"]) => {
    const exampleProjects = await db<Project>("projects")
        .select(["id", "name", "metadata"])
        .where({ example: true })

    const visibleProjects = await db<Project>("projects")
        .select(["id", "name", "metadata"])
        .where({ visible: true })

    const userProjects = await db<Project>("projects")
        .select(["id", "name", "metadata"])
        .where({ owner: id })

    return { exampleProjects, visibleProjects, userProjects }
}
