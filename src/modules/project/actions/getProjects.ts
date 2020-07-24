import { db } from "../../../../db/knex"

import { User } from "../../user/types/User"
import { Project } from "../types/Project"
import { Tutorial } from "../../tutorial/types/Tutorial"

interface CompletedTutorial {
    id: number
    tutorial: Tutorial["id"]
    user: User["id"]
}

export const getProjects = async (userId: User["id"]) => {
    const exampleProjects = await db<Project>("projects")
        .select(["id", "name", "metadata"])
        .where({ example: true })

    const visibleProjects = await db<Project>("projects")
        .select(["id", "name", "metadata"])
        .where({ visible: true })

    const userProjects = await db<Project>("projects")
        .select(["id", "name", "metadata"])
        .where({ owner: userId })

    const tutorials = await db<Tutorial>("tutorials").select(["name","id","owner"])
    const completedTutorials = await db<CompletedTutorial>(
        "completed-tutorials"
    ).select(["tutorial", "user"])

    const tutorialProjects = tutorials.map(tut => {
        const { name, id, owner } = tut
        const completed = completedTutorials
            .filter(el => el.tutorial === id)
            .some(el => el.user === userId)

        const own = owner === userId

        return { name, id, completed, own }
    })

    return { exampleProjects, visibleProjects, userProjects, tutorialProjects }
}
