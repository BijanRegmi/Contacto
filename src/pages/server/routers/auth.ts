import { TypeOf, z } from "zod"
import { procedure, router } from "@/server/trpc"
import { loginProc } from "@/server/controllers/login"
import { registerProc } from "../controllers/register"

const authSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export type authSchema = TypeOf<typeof authSchema>

export const authRouter = router({
	login: procedure.input(authSchema).query(loginProc),
	register: procedure.input(authSchema).query(registerProc),
})
