import { privateProcedure, router } from "@/server/trpc"
import { addRecordProc, addRecordSchema } from "../controllers/addRecord"

export const recordsRouter = router({
	add: privateProcedure.input(addRecordSchema).mutation(addRecordProc),
})
