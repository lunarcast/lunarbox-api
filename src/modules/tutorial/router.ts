import Router from "../Router"

import { HttpError } from "../error/classes/HttpError"

import { Tutorial } from "./types/Tutorial"

import { getTutorials } from "./actions/getTutorials"
import { getTutorialById } from "./actions/getTutorialById"
import { createTutorial } from "./actions/createTutorial"
import { saveTutorial } from "./actions/saveTutorial"
import { deleteTutorial } from "./actions/deleteTutorial"

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

router.post("/", validateSchema(tutorialBody, "body"), async (ctx, next) => {
    const { name, base, requires, solution, steps, hiddenElements } = ctx
        .request.body as Tutorial

    const createdTutorial = await createTutorial({
        name,
        base,
        requires,
        solution,
        steps,
        hiddenElements
    })

    ctx.status = 201
    ctx.body = {
        status: 201,
        message: "Successfully created",
        project: { id: createdTutorial.id }
    }

    await next()
})

router.put("/:id", validateSchema(tutorialBody, "body"), async (ctx, next) => {
    const { id } = ctx.params as Pick<Tutorial, "id">
    const { name, base, requires, solution, steps, hiddenElements } = ctx
        .request.body as Tutorial

    await saveTutorial(id, {
        name,
        base,
        requires,
        solution,
        steps,
        hiddenElements
    })

    ctx.status = 200
    ctx.body = {
        status: 200,
        message: "Successfully updated"
    }

    await next()
})

router.delete("/:id", async (ctx, next) => {
    const tutorialId = ctx.params.id as Tutorial["id"]

    const project = await getTutorialById(tutorialId)

    await deleteTutorial(tutorialId)

    ctx.status = 200
    ctx.body = { status: 200, message: "Successfully deleted tutorial" }

    await next()
})

export default router.routes()
