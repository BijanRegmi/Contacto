import { TRPCError } from "@trpc/server"
import { TypeOf, z } from "zod"
import { Context } from "@/server/context"
import { QueryResponse } from "index"

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
        image: z.string().optional(),
    }),
})

export const editRecordProc = async ({
    input,
    ctx,
}: {
    input: TypeOf<typeof editRecordSchema>
    ctx: Context
}): Promise<{ success: boolean }> => {
    const { db } = ctx

    const keys = Object.keys(input.data)

    const queryStr =
        "UPDATE record SET " +
        keys.map(key => `${key}=?`).join(", ") +
        " WHERE id=? AND accountId=?;"

    const [response, _fields] = await db.query<QueryResponse[]>(queryStr, [
        ...Object.values(input.data),
        input.id,
        ctx.userId,
    ])

    if (response.length == 0)
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Editing record failed.",
        })

    return { success: true }
}
