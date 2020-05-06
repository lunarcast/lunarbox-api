import Koa from "koa"

import Router from "./modules/Router"

import logger from "koa-logger"
import json from "koa-json"
import bodyParser from "koa-bodyparser"

import { allowCors } from "./modules/cors/middleware/allowCors"
import { errorHandler } from "./modules/error/middleware/errorHandler"

import { useSession } from "./modules/session/helpers/useSession"

import apiRoutes from "./modules/apiRouter"

const app = new Koa()

const router = new Router()

const port = Number(process.env.PORT ?? 8090)

app.use(useSession(app)).use(allowCors())

app.use(bodyParser()).use(json({ pretty: false, param: "pretty", spaces: 4 }))

if (process.env.NODE_ENV === "development") {
    app.use(logger())
}

app.use(errorHandler())

router.use(apiRoutes)

app.use(router.routes()).use(router.allowedMethods())

export const server = app.listen(port, () => {
    console.info(`Koa app started and listening on port ${port}! 🚀`)
})
