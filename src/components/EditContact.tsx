import { Record } from "@/server/controllers/listRecords"
import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useState,
} from "react"
import Modal from "@/components/Modal"
import { trpc } from "@/utils/trpc"
import { inferRouterInputs } from "@trpc/server"
import { AppRouter } from "@/server/routers/_app"
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai"
import { BsBuilding } from "react-icons/bs"

type EditInput = inferRouterInputs<AppRouter>["records"]["edit"]

const EditContact = ({
	setShow,
	contact,
}: {
	setShow: Dispatch<SetStateAction<boolean>>
	contact: Record
}) => {
	const [state, setState] = useState<EditInput>({ id: contact.id, data: {} })

	const { mutate } = trpc.records.edit.useMutation({
		onSuccess: data => {
			if (data.success) setShow(false)
		},
	})

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setState(oldVal => ({
			id: oldVal.id,
			data: {
				...oldVal.data,
				[e.target.name]: e.target.value,
			},
		}))
	}

	const onSumbit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (Object.keys(state.data).length != 0) mutate(state)
	}

	return (
		<Modal title="Edit contact" setShow={setShow}>
			<form className="flex flex-col gap-2 px-1 py-2" onSubmit={onSumbit}>
				<div className="relative border-b border-solid border-slate-400 hover:border-slate-900">
					<AiOutlineUser className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
					<input
						className="w-full px-6 py-2 focus:outline-none rounded-md text-sm"
						placeholder="Firstname"
						name="firstname"
						type="text"
						defaultValue={contact.firstname}
						value={state.data.firstname}
						onChange={onChange}
					/>
				</div>
				<div className="relative border-b border-solid border-slate-400 hover:border-slate-900">
					<AiOutlineUser className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1 hidden" />
					<input
						className="w-full px-6 py-2 focus:outline-none rounded-md text-sm"
						placeholder="Lastname"
						name="lastname"
						type="text"
						defaultValue={contact.lastname}
						value={state.data.lastname}
						onChange={onChange}
					/>
				</div>
				<div className="relative border-b border-solid border-slate-400 hover:border-slate-900">
					<BsBuilding className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
					<input
						className="w-full px-6 py-2 focus:outline-none rounded-md text-sm"
						placeholder="Company"
						name="company"
						type="text"
						defaultValue={contact.company}
						value={state.data.company}
						onChange={onChange}
					/>
				</div>
				<div className="relative border-b border-solid border-slate-400 hover:border-slate-900">
					<AiOutlinePhone className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
					<input
						className="w-full px-6 py-2 focus:outline-none rounded-md text-sm"
						placeholder="Phone"
						name="phone"
						type="text"
						defaultValue={contact.phone}
						value={state.data.phone}
						onChange={onChange}
					/>
				</div>
				<div className="relative border-b border-solid border-slate-400 hover:border-slate-900">
					<AiOutlineMail className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
					<input
						className="w-full px-6 py-2 focus:outline-none rounded-md text-sm"
						placeholder="Email"
						name="email"
						type="email"
						defaultValue={contact.email}
						value={state.data.email}
						onChange={onChange}
					/>
				</div>
				<div className="self-end flex flex-row-reverse gap-4">
					<button className="bg-red-400 px-4 py-1 rounded-sm">
						Cancel
					</button>
					<button className="bg-green-400 px-4 py-1 rounded-sm">
						Save
					</button>
				</div>
			</form>
		</Modal>
	)
}

export default EditContact
