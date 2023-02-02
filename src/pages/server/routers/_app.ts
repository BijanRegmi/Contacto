import { z } from "zod"
import { procedure, router } from "../trpc"

export const appRouter = router({
	hello: procedure
		.input(
			z.object({
				name: z.string(),
			})
		)
		.query(({ input }) => {
			return {
				greeting: `hello ${input.name}`,
			}
		}),
})

// export type definition of API
export type AppRouter = typeof appRouter
