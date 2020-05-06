import Router from "./Router"

import userRouter from "./user/router"
import authRouter from "./auth/router"

const apiRouter = new Router({ prefix: "/api" })

apiRouter.use(userRouter)
apiRouter.use(authRouter)

export default apiRouter.routes()
