import Router from "../Router"

import { HttpError } from "../error/classes/HttpError"

import { Project } from "../project/types/Project"

import { getProjectById } from "../project/actions/getProjectById"
import { findUser } from "../user/actions/findUser"

const imageLink =
    "https://cdn.discordapp.com/attachments/672889285438865453/708081533151477890/favicon.png"

const router = new Router({ prefix: "/go" })

router.get("/:id", async (ctx, next) => {
    const { id: projectId } = ctx.params as Pick<Project, "id">

    const project = await getProjectById(projectId)
    if (!project) throw new HttpError(404)
    if (!project.visible) throw new HttpError(401)

    const author = (await findUser("id", project.owner))!

    ctx.status = 200
    ctx.type = "text/html; charset=utf-8"
    ctx.body = `<meta property="og:title" content="${project.name}" />
        <meta property="og:type" content="website" />
        <meta
            property="og:description"
            content="${
                project.description ??
                `Check out ${author.username}'s project here!`
            }"
        />
        <meta name="theme-color" content="#262335" />

        <meta property="og:image" content="${imageLink}" />`

    await next()
})

export default router.routes()
