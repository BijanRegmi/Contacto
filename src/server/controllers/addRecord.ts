import { TRPCError } from "@trpc/server"
import { TypeOf, z } from "zod"
import { Context } from "@/server/context"

export const addRecordSchema = z.object({
	firstname: z.string(),
	lastname: z.string().optional(),
	company: z.string().optional(),
	phone: z
		.string()
		.length(10)
		.transform(val => Number(val)),
	email: z.string().email().optional(),
	birthday: z.date().optional(),
	image: z.string().optional(),
})

export const addRecordProc = async ({
	input,
	ctx,
}: {
	input: TypeOf<typeof addRecordSchema>
	ctx: Context
}): Promise<{ success: boolean; id: string }> => {
	const { db } = ctx
	const keys = Object.keys(input)

	const queryStr =
		"INSERT INTO record(" +
		keys.join(", ") +
		', "accountId") VALUES (' +
		keys.map((_, idx) => `\$${idx + 1}`).join(", ") +
		", $" +
		`${keys.length + 1}` +
		") RETURNING id"

	const response = await db.query(queryStr, [
		...Object.values(input),
		ctx.userId,
	])

	if (response.rows.length == 0)
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Adding record failed.",
		})

	return { success: true, id: response.rows[0].id }
}
