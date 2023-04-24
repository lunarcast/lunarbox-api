import Router from "../Router"

import { HttpError } from "../error/classes/HttpError"

import { Project } from "./types/Project"

import { getProjects } from "./actions/getProjects"
import { getProjectById } from "./actions/getProjectById"
import { createProject } from "./actions/createProject"
import { saveProject } from "./actions/saveProject"
import { deleteProject } from "./actions/deleteProject"

import { validateSchema } from "../schema/middleware/validateSchema"

import { projectBody } from "./schema/projectBody"

import { requireAuthenticated } from "../auth/middleware/requireAuthenticated"
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
    const { id: projectId } = ctx.params as Pick<Project, "id">
    const userId = ctx.session!.user

    const project = await getProjectById(projectId)
    if (!project) throw new HttpError(404)
    if (!project.visible && project.owner !== userId) {
        throw new HttpError(401, "It seems like this is not your project")
    }

    ctx.status = 200
    ctx.body = project

    await next()
})

router.get("/clone/:id", requireAuthenticated(), async (ctx, next) => {
    const { id: projectId } = ctx.params as Pick<Project, "id">
    const userId = ctx.session!.user

    const project = await getProjectById(projectId)
    if (!project) {
        throw new HttpError(404, "Seems like there's no project with that id")
    }
    const { isExample, visible, id, ...proj } = project

    if (!visible) {
        throw new HttpError(
            401,
            "Seems like the project you're trying to clone is not public"
        )
    }

    const createdProject = await createProject({
        ...proj,
        owner: userId,
        example: false,
        name: `${project.name} - clone`,
        visible: false
    })

    ctx.status = 201
    ctx.body = {
        status: 201,
        message: "Successfully cloned",
        project: { id: createdProject.id }
    }

    await next()
})

router.post(
    "/",
    requireAuthenticated(),
    validateSchema(projectBody, "body"),
    async (ctx, next) => {
        const { name, description, project, metadata, visible } = ctx.request
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
            example,
            visible
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

router.put(
    "/:id",
    requireAuthenticated(),
    validateSchema(projectBody, "body"),
    async (ctx, next) => {
        const { id } = ctx.params as Pick<Project, "id">
        const { name, description, project, metadata, visible } = ctx.request
            .body as Project

        const userId = ctx.session!.user

        const isExample: boolean = ctx.request.body.isExample

        await saveProject(id, {
            owner: userId,
            name,
            description,
            example: isExample,
            visible,
            project,
            metadata
        })

        ctx.status = 200
        ctx.body = {
            status: 200,
            message: "Successfully updated"
        }

        await next()
    }
)

router.delete("/:id", requireAuthenticated(), async (ctx, next) => {
    const projectId = ctx.params.id as Project["id"]
    const userId = ctx.session!.user

    const project = await getProjectById(projectId)
    if (project?.owner !== userId) {
        throw new HttpError(
            401,
            "You don't seem to be the owner of that project"
        )
    }

    await deleteProject(projectId)

    ctx.status = 200
    ctx.body = { status: 200, message: "Successfully deleted user project" }

    await next()
})

export default router.routes()
