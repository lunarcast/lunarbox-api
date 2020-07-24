import Router from "../Router"

import { HttpError } from "../error/classes/HttpError"

import { Tutorial } from "./types/Tutorial"

import { getTutorials } from "./actions/getTutorials"
import { getTutorialById } from "./actions/getTutorialById"
import { createTutorial } from "./actions/createTutorial"
import { saveTutorial } from "./actions/saveTutorial"
import { deleteTutorial } from "./actions/deleteTutorial"

import { requireUnauthenticated } from "../auth/middleware/requireUnauthenticated"
import { requireAdmin } from "../auth/middleware/requireAdmin"

import { validateSchema } from "../schema/middleware/validateSchema"

import { tutorialBody } from "./schema/tutorialBody"

const router = new Router({ prefix: "/tutorials" })

router.get("/", async (ctx, next) => {
    const userId = ctx.session!.user

    const tutorials = await getTutorials()

    ctx.status = 200
    ctx.body = tutorials

    await next()
})

router.get("/:id", async (ctx, next) => {
    const { id: tutorialId } = ctx.params as Pick<Tutorial, "id">

    const tutorial = await getTutorialById(tutorialId)
    if (!tutorial) throw new HttpError(404)

    ctx.status = 200
    ctx.body = tutorial

    await next()
})

router.post(
    "/",
    requireAdmin(),
    validateSchema(tutorialBody, "body"),
    async (ctx, next) => {
        const { name, base, content, solution,  hiddenElements } = ctx
            .request.body as Tutorial

        const session = ctx.session!

        const createdTutorial = await createTutorial({
            name,
            base,
            content,
            solution,
            hiddenElements,
            owner: session.owner
        })

        ctx.status = 201
        ctx.body = {
            status: 201,
            message: "Successfully created",
            project: { id: createdTutorial.id }
        }

        await next()
    }
)

router.put(
    "/:id",
    requireAdmin(),
    validateSchema(tutorialBody, "body"),
    async (ctx, next) => {
        const { id } = ctx.params as Pick<Tutorial, "id">
        const { name, base, content, solution,  hiddenElements } = ctx
            .request.body as Tutorial

        const session = ctx.session!

        const tutorial = await getTutorialById(id)
        if (!tutorial) {
            throw new HttpError(
                404,
                "There seems to be no tutorial with that id"
            )
        }
        if (tutorial.owner !== session.user) {
            throw new HttpError(
                401,
                "You don't seem to be the owner of that tutorial"
            )
        }

        await saveTutorial(id, {
            name,
            base,
            solution,
            content,
            hiddenElements
        })

        ctx.status = 200
        ctx.body = {
            status: 200,
            message: "Successfully updated"
        }

        await next()
    }
)

router.delete("/:id", async (ctx, next) => {
    const id = ctx.params.id as Tutorial["id"]

    const session = ctx.session!

    const tutorial = await getTutorialById(id)
    if (!tutorial) {
        throw new HttpError(404, "There seems to be no tutorial with that id")
    }
    if (tutorial.owner !== session.user) {
        throw new HttpError(
            401,
            "You don't seem to be the owner of that tutorial"
        )
    }

    await deleteTutorial(id)

    ctx.status = 200
    ctx.body = { status: 200, message: "Successfully deleted tutorial" }

    await next()
})

export default router.routes()
