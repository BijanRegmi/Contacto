import { TRPCError } from "@trpc/server"
import { sign } from "jsonwebtoken"
import { setCookie } from "nookies"
import type { Context } from "@/server/context"
import type { authSchema } from "@/server/routers/auth"

export const registerProc = async ({
	input,
	ctx,
}: {
	input: authSchema
	ctx: Context
}): Promise<{ success: boolean; id: string }> => {
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
}
