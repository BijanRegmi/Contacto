import { TRPCError } from "@trpc/server"
import { TypeOf, z } from "zod"
import { Context } from "@/server/context"
import { QueryResponse } from "index"

export const addRecordSchema = z.object({
	firstname: z.string(),
	lastname: z.string().optional(),
	company: z.string().optional(),
	phone: z
		.string()
		.length(10)
		.transform(val => Number(val)),
	email: z.string().email().optional(),
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
		", accountId) VALUES (" +
		keys.map(_ => "?").join(", ") +
		", ?) RETURNING id"

	const [response, _fields] = await db.query<QueryResponse[]>(queryStr, [
		...Object.values(input),
		ctx.userId,
	])

	if (response.length == 0)
		throw new TRPCError({
			code: "BAD_REQUEST",
			message: "Adding record failed.",
		})

	return { success: true, id: response[0].id }
}
