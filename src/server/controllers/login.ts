import { z, TypeOf } from "zod"
import { TRPCError } from "@trpc/server"
import { sign } from "jsonwebtoken"
import { setCookie } from "nookies"
import type { Context } from "@/server/context"

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export const loginProc = async ({
	input,
	ctx,
}: {
	input: TypeOf<typeof loginSchema>
	ctx: Context
}): Promise<{ success: boolean; id: string }> => {
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
}
