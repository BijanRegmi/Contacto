import { router } from "@/server/trpc"
import { authRouter } from "@/server/routers/auth"

export const appRouter = router({ auth: authRouter })

// export type definition of API
export type AppRouter = typeof appRouter
