import { TypeOf, z } from "zod"
import { TRPCError } from "@trpc/server"
import { sign } from "jsonwebtoken"
import { setCookie } from "nookies"
import type { Context } from "@/server/context"
import { hashSync } from "bcryptjs"
import { QueryResponse } from "index"

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

	const hashedPassword = hashSync(password, 10)

	const queryStr =
		"INSERT INTO account(email, password, username) VALUES(?, ?, ?) RETURNING id"
	const [response, _fields] = await db.query<QueryResponse[]>(queryStr, [
		email,
		hashedPassword,
		username,
	])

	if (response.length == 0)
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Failed to register.",
		})

	const token = sign(response[0], process.env.SECRET || "secret")
	setCookie({ res: ctx.res }, "token", token, {
		httpOnly: true,
		sameSite: "lax",
	})

	return { success: true, id: response[0].id }
}
