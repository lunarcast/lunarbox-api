import Router from "./Router"

import userRouter from "./user/router"
import authRouter from "./auth/router"
import projectRouter from "./project/router"
import tutorialRouter from "./tutorial/router"

const apiRouter = new Router({ prefix: "/api" })

apiRouter.use(userRouter)
apiRouter.use(authRouter)
apiRouter.use(projectRouter)
apiRouter.use(tutorialRouter)

export default apiRouter.routes()
