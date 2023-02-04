import type { Context } from "@/server/context"
export const userProc = async ({ ctx }: { ctx: Context }) => {
	return { id: ctx.userId }
}
