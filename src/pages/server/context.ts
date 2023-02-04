import { inferAsyncReturnType } from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { dbConn } from "../utils/db"

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
	const { req, res } = ctx
	const db = await dbConn()
	return { req, res, db, userId: "" }
}

export type Context = inferAsyncReturnType<typeof createContext>
