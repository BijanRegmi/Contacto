import { privateProcedure, router } from "@/server/trpc"
import { addRecordProc, addRecordSchema } from "@/server/controllers/addRecord"
import {
	deleteRecordProc,
	deleteRecordSchema,
} from "../controllers/deleteRecord"
import { editRecordProc, editRecordSchema } from "../controllers/editRecord"

export const recordsRouter = router({
	add: privateProcedure.input(addRecordSchema).mutation(addRecordProc),
	delete: privateProcedure
		.input(deleteRecordSchema)
		.mutation(deleteRecordProc),
	edit: privateProcedure.input(editRecordSchema).mutation(editRecordProc),
})
