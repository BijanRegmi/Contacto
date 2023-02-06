import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { Record } from "@/server/controllers/listRecords"
import { Dispatch, SetStateAction } from "react"
import Image from "next/image"

const RecordEntry = ({
	contact,
	setDelCont,
	setEditCont,
}: {
	contact: Record
	setDelCont: Dispatch<SetStateAction<Record | boolean>>
	setEditCont: Dispatch<SetStateAction<Record | boolean>>
}) => {
	return (
		<tr className="h-16 border-b border-solid border-gray-700 text-slate-200">
			<td className="h-full aspect-square">
				<div className="relative h-4/5 max-h-4/5 aspect-square mx-auto">
					<Image
						src={contact.image as string || "/defaultUser.png"}
						alt="User image"
						fill={true}
						className="rounded-full aspect-square border-solid border-4 border-slate-700"
					/>
				</div>
			</td>
			<td className="px-3 py-2">
				<p>
					{contact.firstname} {contact.lastname}
				</p>
			</td>
			<td className="px-3 py-2">
				<p>{contact.phone}</p>
			</td>
			<td className="px-3 py-2">
				<p>{contact.company}</p>
			</td>
			<td className="px-3 py-2">
				<p>{contact.email}</p>
			</td>
			<td className="px-3 py-2">
				<button
					type="button"
					title="Edit contact"
					className="p-1 rounded-full text-slate-400 hover:bg-slate-700"
					onClick={() => {
						setEditCont(contact)
					}}
				>
					<AiOutlineEdit className="text-xl" />
				</button>
				<button
					type="button"
					title="Delete contact"
					className="p-1 rounded-full text-slate-400 hover:bg-slate-700"
					onClick={() => {
						setDelCont(contact)
					}}
				>
					<AiOutlineDelete className="text-lg" />
				</button>
			</td>
		</tr>
	)
}

export default RecordEntry
