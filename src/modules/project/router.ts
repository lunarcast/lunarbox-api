import Router from "../Router"

import { HttpError } from "../error/classes/HttpError"

import { Project } from "./types/Project"

import { getProjects } from "./actions/getProjects"
import { getProjectById } from "./actions/getProjectById"
import { createProject } from "./actions/createProject"
import { toggleExample } from "./actions/toggleExample"
import { deleteProject } from "./actions/deleteProject"

import { validateSchema } from "../schema/middleware/validateSchema"

import { projectBody } from "./schema/projectBody"

import { exampleBody } from "./schema/toggleExampleBody"

import { requireAuthenticated } from "../auth/middleware/requireAuthenticated"
import { requireAdmin } from "../auth/middleware/requireAdmin"
import { findUser } from "../user/actions/findUser"

const router = new Router({ prefix: "/projects" })

router.get("/", requireAuthenticated(), async (ctx, next) => {
    const userId = ctx.session!.user

    const projects = await getProjects(userId)

    ctx.status = 200
    ctx.body = projects

    await next()
})

router.get("/:id", requireAuthenticated(), async (ctx, next) => {
    const { id: projectId } = ctx.params.id as Pick<Project, "id">

    const project = await getProjectById(projectId)
    if (!project) throw new HttpError(404)

    ctx.status = 200
    ctx.body = project

    await next()
})

router.post(
    "/",
    requireAuthenticated(),
    validateSchema(projectBody, "body"),
    async (ctx, next) => {
        const { name, description, project, metadata } = ctx.request
            .body as Project
        const isExample: boolean = ctx.request.body.isExample

        const userId = ctx.session!.user
        const user = await findUser("id", userId)

        const example = user?.admin ? isExample : false

        const createdProject = await createProject({
            name,
            description,
            project,
            owner: userId,
            metadata,
            example
        })

        ctx.status = 201
        ctx.body = {
            status: 201,
            message: "Successfully created",
            project: { id: createdProject.id }
        }

        await next()
    }
)

router.delete("/:id", requireAuthenticated(), async (ctx, next) => {
    const projectId = ctx.params.id as Project["id"]

    await deleteProject(projectId)

    ctx.status = 200
    ctx.body = { status: 200, message: "Successfully deleted user project" }

    await next()
})

router.post(
    "/example",
    requireAuthenticated(),
    requireAdmin(),
    validateSchema(exampleBody, "body"),
    async (ctx, next) => {
        const { id } = ctx.request.body as Pick<Project, "id">

        await toggleExample(id)

        ctx.status = 200
        ctx.body = {
            status: 200,
            message: "Successfully toggled project's example status"
        }

        await next()
    }
)

export default router.routes()
