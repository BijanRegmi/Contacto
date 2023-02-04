import { privateProcedure, router } from "@/server/trpc"
import { addRecordProc, addRecordSchema } from "@/server/controllers/addRecord"
import {
	deleteRecordProc,
	deleteRecordSchema,
} from "../controllers/deleteRecord"

export const recordsRouter = router({
	add: privateProcedure.input(addRecordSchema).mutation(addRecordProc),
	delete: privateProcedure
		.input(deleteRecordSchema)
		.mutation(deleteRecordProc),
})
