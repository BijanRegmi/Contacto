import { TypeOf, z } from "zod"
import { privateProcedure, procedure, router } from "@/server/trpc"
import { loginProc } from "@/server/controllers/login"
import { registerProc } from "../controllers/register"
import { userProc } from "../controllers/user"

const authSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export type authSchema = TypeOf<typeof authSchema>

export const authRouter = router({
	login: procedure.input(authSchema).mutation(loginProc),
	register: procedure.input(authSchema).mutation(registerProc),
	user: privateProcedure.query(userProc),
})
