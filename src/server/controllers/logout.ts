import { Context } from "@/server/context"
import { destroyCookie } from "nookies"

export const logoutProc = ({ ctx }: { ctx: Context }) => {
	destroyCookie({ res: ctx.res }, "token")
	return { success: true }
}
