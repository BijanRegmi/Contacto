import { TRPCError } from "@trpc/server"
import { TypeOf, z } from "zod"
import { Context } from "../context"

export const editRecordSchema = z.object({
	id: z.string(),
	data: z.object({
		firstname: z.string().optional(),
		lastname: z.string().optional(),
		company: z.string().optional(),
		phone: z
			.string()
			.length(10)
			.transform(val => Number(val))
			.optional(),
		email: z.string().email().optional(),
		birthday: z.date().optional(),
	}),
})

export const editRecordProc = async ({
	input,
	ctx,
}: {
	input: TypeOf<typeof editRecordSchema>
	ctx: Context
}): Promise<{ success: boolean; id: string }> => {
	const { db } = ctx

	const keys = Object.keys(input.data)

	const queryStr =
		"UPDATE record SET " +
		keys.map((key, idx) => `${key} = \$${idx + 1}`).join(", ") +
		" WHERE id = $" +
		`${keys.length + 1}` +
		' AND "accountId" = $' +
		`${keys.length + 2}` +
		"RETURNING id"
	const response = await db.query(queryStr, [
		...Object.values(input.data),
		input.id,
		ctx.userId,
	])

	if (response.rows.length == 0)
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Editing record failed.",
		})

	return { success: true, id: response.rows[0].id }
}
