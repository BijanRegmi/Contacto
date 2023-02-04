import { z } from "zod"
import { privateProcedure, procedure, router } from "@/server/trpc"
import { dbConn } from "@/pages/utils/db"
import { TRPCError } from "@trpc/server"
import { sign } from "jsonwebtoken"
import { setCookie } from "nookies"

const authInput = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export const authRouter = router({
	login: procedure.input(authInput).query(async ({ input, ctx }) => {
		const { email, password } = input
		const { db } = ctx

		const queryStr = "SELECT id FROM account WHERE email=$1 AND password=$2"
		const response = await db.query(queryStr, [email, password])

		if (response.rows.length == 0)
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Email and Password donot match.",
			})

		const token = sign(response.rows[0], process.env.SECRET || "Secret")
		setCookie({ res: ctx.res }, "token", token, {
			httpOnly: true,
			sameSite: "lax",
		})

		return { success: true, id: response.rows[0].id }
	}),
	register: procedure.input(authInput).query(async ({ input, ctx }) => {
		const { email, password } = input
		const { db } = ctx

		const queryStr =
			"INSERT INTO account(email, password) VALUES($1, $2) RETURNING id"
		const response = await db.query(queryStr, [email, password])

		if (response.rows.length == 0)
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Failed to register.",
			})

		const token = sign(response.rows[0], process.env.SECRET || "secret")
		setCookie({ res: ctx.res }, "token", token, {
			httpOnly: true,
			sameSite: "lax",
		})

		return { success: true, id: response.rows[0].id }
	}),
})
