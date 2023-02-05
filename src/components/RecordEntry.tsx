import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { Record } from "@/server/controllers/listRecords"
import { Dispatch, SetStateAction } from "react"

const RecordEntry = ({
	contact,
	idx,
	setDelCont,
}: {
	contact: Record
	idx: number
	setDelCont: Dispatch<SetStateAction<string | boolean>>
}) => {
	return (
		<tr>
			<td className="px-3 text-sm font-medium text-gray-400">
				{idx + 1}
			</td>
			<td className="px-3 py-2">
				<p>{contact.firstname}</p>
			</td>
			<td className="px-3 py-2">
				<p>{contact.lastname}</p>
			</td>
			<td className="px-3 py-2">
				<p>{contact.company}</p>
			</td>
			<td className="px-3 py-2">
				<p>{contact.phone}</p>
			</td>
			<td className="px-3 py-2">
				<p>{contact.email}</p>
			</td>
			<td className="px-3 py-2">
				<button
					type="button"
					title="Edit contact"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-700 focus:bg-gray-700"
				>
					<AiOutlineEdit />
				</button>
				<button
					type="button"
					title="Delete contact"
					className="p-1 rounded-full text-gray-600 hover:bg-gray-700 focus:bg-gray-700"
					onClick={() => {
						setDelCont(contact.id)
					}}
				>
					<AiOutlineDelete />
				</button>
			</td>
		</tr>
	)
}

export default RecordEntry
