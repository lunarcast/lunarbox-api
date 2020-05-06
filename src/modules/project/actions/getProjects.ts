import { db } from "../../../../db/knex"

import { User } from "../../user/types/User"
import { Project } from "../types/Project"

export const getProjects = async (id: User["id"]) => {
    const exampleProjects = (
        await db<Project>("projects")
            .select(["id", "name", "project"])
            .where({ example: true })
    ).map(e => {
        const { project: proj } = e
        const { nodeCount, functionCount } = proj

        return { ...e, nodeCount, functionCount }
    })

    const userProjects = (
        await db<Project>("projects")
            .select(["id", "name", "project"])
            .where({ owner: id })
    ).map(e => {
        const { project: proj } = e
        const { nodeCount, functionCount } = proj

        return { ...e, nodeCount, functionCount }
    })

    return { exampleProjects, userProjects }
}
