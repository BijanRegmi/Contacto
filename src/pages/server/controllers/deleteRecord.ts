import { TypeOf, z } from "zod"
import { Context } from "@/server/context"
import { TRPCError } from "@trpc/server"

export const deleteRecordSchema = z.object({ id: z.string() })

export const deleteRecordProc = async ({
	input,
	ctx,
}: {
	input: TypeOf<typeof deleteRecordSchema>
	ctx: Context
}): Promise<{ success: boolean; id: string }> => {
	const { db } = ctx

	const queryStr =
		'DELETE FROM record WHERE id=$1 AND "accountId"=$2 RETURNING id'
	const response = await db.query(queryStr, [input.id, ctx.userId])

	if (response.rows.length == 0)
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Deleting record failed.",
		})

	return { success: true, id: response.rows[0].id }
}
