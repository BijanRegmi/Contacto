import type { Context } from "@/server/context"
import { TRPCError } from "@trpc/server"
import { destroyCookie } from "nookies"
export const userProc = async ({ ctx }: { ctx: Context }) => {
	const { db } = ctx
	const response = await db.query(
		"SELECT email, username, id FROM account WHERE id=$1",
		[ctx.userId]
	)
	if (response.rows.length == 0) {
		destroyCookie({ res: ctx.res }, "token")
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "User not found.",
		})
	}

	return response.rows[0] as { email: string; username: string; id: string }
}
