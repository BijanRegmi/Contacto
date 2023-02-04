import { router } from "@/server/trpc"
import { authRouter } from "@/server/routers/auth"
import { recordsRouter } from "@/server/routers/records"

export const appRouter = router({ auth: authRouter, records: recordsRouter })

// export type definition of API
export type AppRouter = typeof appRouter
