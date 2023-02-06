import { initTRPC, TRPCError } from "@trpc/server"
import { Context } from "@/server/context"
import { verify } from "jsonwebtoken"
import { parseCookies } from "nookies"
import { UserToken } from "jsonwebtoken"
import { ZodError } from "zod"

declare module "jsonwebtoken" {
	export interface UserToken extends JwtPayload {
		id: string
	}
}

const t = initTRPC.context<Context>().create({
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.code == "BAD_REQUEST" &&
						error.cause instanceof ZodError
						? error.cause
						: null,
			},
		}
	},
})

const withAuth = t.middleware(({ next, ctx }) => {
	const cookies = parseCookies({ req: ctx.req })
	const token = cookies["token"]
	if (!token)
		throw new TRPCError({ code: "UNAUTHORIZED", cause: "Missing token." })

	const data = <UserToken>verify(token, process.env.SECRET || "Secret")
	if (!data)
		throw new TRPCError({ code: "UNAUTHORIZED", cause: "Invalid token." })

	ctx.userId = data.id
	return next()
})

// Base router and procedure helpers
export const router = t.router
export const procedure = t.procedure
export const privateProcedure = t.procedure.use(withAuth)
