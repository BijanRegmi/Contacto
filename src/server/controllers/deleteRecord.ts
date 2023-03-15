import { TypeOf, z } from "zod"
import { Context } from "@/server/context"
import { TRPCError } from "@trpc/server"
import { QueryResponse } from "index"

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
        "DELETE FROM record WHERE id=? AND accountId=? RETURNING id"
    const [response, _fields] = await db.query<QueryResponse[]>(queryStr, [
        input.id,
        ctx.userId,
    ])

    if (response.length == 0)
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Deleting record failed.",
        })

    return { success: true, id: response[0].id }
}
