import { initTRPC, TRPCError } from "@trpc/server"
import { Context } from "@/server/context"
import { verify } from "jsonwebtoken"
import { parseCookies } from "nookies"
import { UserToken } from "jsonwebtoken"

declare module "jsonwebtoken" {
	export interface UserToken extends JwtPayload {
		id: String
	}
}

const t = initTRPC.context<Context>().create()

const withAuth = t.middleware(({ next, ctx }) => {
	const cookies = parseCookies({ req: ctx.req })
	const token = cookies["token"]
	if (!token)
		throw new TRPCError({ code: "UNAUTHORIZED", cause: "Missing token." })

	const data = <UserToken>verify(token, process.env.SECRET || "Secret")
	if (!data)
		throw new TRPCError({ code: "UNAUTHORIZED", cause: "Invalid token." })

	return next({ ctx: { ...ctx, userId: data.id } })
})

// Base router and procedure helpers
export const router = t.router
export const procedure = t.procedure
export const privateProcedure = t.procedure.use(withAuth)
