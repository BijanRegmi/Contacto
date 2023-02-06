import { Context } from "@/server/context"

export interface Record {
	id: string
	firstname: string
	lastname?: string
	company?: string
	phone: string
	email?: string
	image?: string
}

export const listRecordsProc = async ({ ctx }: { ctx: Context }) => {
	const { db } = ctx

	const queryStr =
		'SELECT id, firstname, lastname, company, phone, email, image FROM record WHERE "accountId"=$1'

	const response = await db.query(queryStr, [ctx.userId])
	return response.rows as Record[]
}
