import type { Context } from "@/server/context"
import { TRPCError } from "@trpc/server"
import { destroyCookie } from "nookies"
import { UserResponse } from "index"

export const userProc = async ({
	ctx,
}: {
	ctx: Context
}): Promise<{ id: string; email: string; username: string }> => {
	const { db } = ctx
	const [response, _fields] = await db.query<UserResponse[]>(
		"SELECT email, username, id FROM account WHERE id=?",
		[ctx.userId]
	)
	if (response.length == 0) {
		destroyCookie({ res: ctx.res }, "token")
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "User not found.",
		})
	}

	return response[0]
}
