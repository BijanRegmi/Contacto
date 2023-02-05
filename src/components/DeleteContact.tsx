import { trpc } from "@/utils/trpc"
import { Dispatch, SetStateAction } from "react"
import Modal from "./Modal"

const DeleteContact = ({
	setShow,
	id,
}: {
	setShow: Dispatch<SetStateAction<boolean | string>>
	id: string
}) => {
	const { mutate } = trpc.records.delete.useMutation({
		onSuccess: data => {
			if (data.success) setShow(false)
		},
	})

	return (
		<Modal title="Confirm Delete?" setShow={setShow}>
			<div className="flex flex-row-reverse gap-4">
				<button
					className="bg-red-400 px-4 py-1 rounded-sm"
					onClick={() => {
						setShow(false)
					}}
				>
					No
				</button>
				<button
					className="bg-green-400 px-4 py-1 rounded-sm"
					onClick={() => {
						mutate({ id })
					}}
				>
					Yes
				</button>
			</div>
		</Modal>
	)
}

export default DeleteContact
