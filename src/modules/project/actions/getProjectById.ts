import { db } from "../../../../db/knex"

import { Project } from "../types/Project"

export const getProjectById = (id: Project["id"]) =>
    db<Project>("projects").select().first().where({ id })
