import { Context } from "@/server/context"

export const listRecordsProc = async ({ ctx }: { ctx: Context }) => {
	const { db } = ctx

	const queryStr =
		'SELECT id, firstname, lastname FROM record WHERE "accountId"=$1'
	const response = await db.query(queryStr, [ctx.userId])
	return response.rows
}
