import Router from "./Router"

import userRouter from "./user/router"

const apiRouter = new Router({ prefix: "/api" })

apiRouter.use(userRouter)

export default apiRouter.routes()
