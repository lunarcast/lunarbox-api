import { db } from "../../../../db/knex"

import { User } from "../../user/types/User"
import { Project } from "../types/Project"

export const getProjects = async (id: User["id"]) => {
    const exampleProjects = await db<Project>("projects")
        .select()
        .where({ example: true })

    const userProjects = await db<Project>("projects")
        .select()
        .where({ owner: id })

    return { exampleProjects, userProjects }
}
