import { privateProcedure, router } from "@/server/trpc"
import { addRecordProc, addRecordSchema } from "@/server/controllers/addRecord"
import {
	deleteRecordProc,
	deleteRecordSchema,
} from "@/server/controllers/deleteRecord"
import {
	editRecordProc,
	editRecordSchema,
} from "@/server/controllers/editRecord"
import { getRecordProc, getRecordSchema } from "@/server/controllers/getRecord"
import { listRecordsProc } from "@/server/controllers/listRecords"

export const recordsRouter = router({
	add: privateProcedure.input(addRecordSchema).mutation(addRecordProc),
	delete: privateProcedure
		.input(deleteRecordSchema)
		.mutation(deleteRecordProc),
	edit: privateProcedure.input(editRecordSchema).mutation(editRecordProc),
	get: privateProcedure.input(getRecordSchema).query(getRecordProc),
	list: privateProcedure.query(listRecordsProc),
})
