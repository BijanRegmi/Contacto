import { Context } from "@/server/context"
import { RecordResponse } from "index"

export interface Record {
    id: string
    firstname: string
    lastname?: string
    company?: string
    phone: string
    email?: string
    image?: string
}

export const listRecordsProc = async ({
    ctx,
}: {
    ctx: Context
}): Promise<
    {
        id: string
        firstname: string
        lastname: string
        company: string
        phone: string
        email: string
        image: string
    }[]
> => {
    const { db, userId } = ctx
    const queryStr =
        "SELECT id, firstname, lastname, company, phone, email, image FROM record WHERE accountId=?"

    const [response, _fields] = await db.query<RecordResponse[]>(queryStr, [
        userId,
    ])

    return response
}
