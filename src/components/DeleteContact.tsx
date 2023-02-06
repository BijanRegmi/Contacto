/* eslint-disable react/no-unescaped-entities */
import { trpc } from "@/utils/trpc"
import { Dispatch, SetStateAction, useContext } from "react"
import Modal from "@/components/Modal"
import { Record } from "@/server/controllers/listRecords"
import { AppContext } from "@/pages/_app"
import { ContextActionKind } from "@/utils/reducer"

const DeleteContact = ({
	setShow,
	contact,
}: {
	setShow: Dispatch<SetStateAction<boolean>>
	contact: Record
}) => {
	const { dispatch } = useContext(AppContext)

	const { mutate } = trpc.records.delete.useMutation({
		onSuccess: data => {
			if (data.success) setShow(false)
		},
		onError: err => {
			if (err.data?.zodError) {
				err.data.zodError.issues.forEach(issue => {
					dispatch({
						type: ContextActionKind.SPAWNALERT,
						payload: { type: "error", message: issue.message },
					})
				})
			} else {
				dispatch({
					type: ContextActionKind.SPAWNALERT,
					payload: { type: "error", message: err.message },
				})
			}
		},
	})

	return (
		<Modal title="Delete Contact" setShow={setShow}>
			<span className="block mb-4">
				Are you sure you want to delete {contact.firstname}'s contact?
			</span>
			<div className="flex flex-row-reverse gap-4 text-slate-100">
				<button
					className="bg-slate-900 px-4 py-1 rounded-sm"
					onClick={() => {
						setShow(false)
					}}
				>
					No
				</button>
				<button
					className="bg-slate-900 px-4 py-1 rounded-sm"
					onClick={() => {
						mutate({ id: contact.id })
					}}
				>
					Yes
				</button>
			</div>
		</Modal>
	)
}

export default DeleteContact
