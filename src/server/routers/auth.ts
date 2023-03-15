import { privateProcedure, procedure, router } from "@/server/trpc"
import { loginProc, loginSchema } from "@/server/controllers/login"
import { registerProc, registerSchema } from "@/server/controllers/register"
import { userProc } from "@/server/controllers/user"
import { logoutProc } from "../controllers/logout"

export const authRouter = router({
    login: procedure.input(loginSchema).mutation(loginProc),
    register: procedure.input(registerSchema).mutation(registerProc),
    user: privateProcedure.query(userProc),
    logout: procedure.mutation(logoutProc),
})
