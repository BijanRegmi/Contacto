import { TypeOf, z } from "zod"
import { Context } from "../context"

export const getRecordSchema = z.object({
	id: z.string(),
})

export const getRecordProc = async ({
	input,
	ctx,
}: {
	input: TypeOf<typeof getRecordSchema>
	ctx: Context
}) => {
	const { db } = ctx

	const queryStr = 'SELECT * FROM record WHERE id=$1 AND "accountId"=$2'
	const response = await db.query(queryStr, [input.id, ctx.userId])
	const info: {
		id: string
		firstname: string
		lastname: string
		company: string
		phone: string
		email: string
		birthday?: null
		accountId: string
	} = response.rows[0]

	return info
}
