import { TypeOf, z } from "zod"
import { TRPCError } from "@trpc/server"
import { sign } from "jsonwebtoken"
import { setCookie } from "nookies"
import type { Context } from "@/server/context"

export const registerSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	username: z.string(),
})

export const registerProc = async ({
	input,
	ctx,
}: {
	input: TypeOf<typeof registerSchema>
	ctx: Context
}): Promise<{ success: boolean; id: string }> => {
	const { email, password, username } = input
	const { db } = ctx

	const queryStr =
		"INSERT INTO account(email, password, username) VALUES($1, $2, $3) RETURNING id"
	const response = await db.query(queryStr, [email, password, username])

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
