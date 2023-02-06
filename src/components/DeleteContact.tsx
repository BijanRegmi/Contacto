/* eslint-disable react/no-unescaped-entities */
import { trpc } from "@/utils/trpc"
import { Dispatch, SetStateAction } from "react"
import Modal from "@/components/Modal"
import { Record } from "@/server/controllers/listRecords"

const DeleteContact = ({
	setShow,
	contact,
}: {
	setShow: Dispatch<SetStateAction<boolean>>
	contact: Record
}) => {
	const { mutate } = trpc.records.delete.useMutation({
		onSuccess: data => {
			if (data.success) setShow(false)
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
