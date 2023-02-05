import { Record } from "@/server/controllers/listRecords"
import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useState,
	MouseEvent,
} from "react"
import Modal from "@/components/Modal"
import { trpc } from "@/utils/trpc"
import { inferRouterInputs } from "@trpc/server"
import { AppRouter } from "@/server/routers/_app"
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai"
import { BsBuilding } from "react-icons/bs"
import { RiImageAddLine } from "react-icons/ri"
import { RxCrossCircled } from "react-icons/rx"
import Image from "next/image"

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

	const clearImage = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
		e.stopPropagation()
		e.preventDefault()
		setState(oldVal => ({
			id: oldVal.id,
			data: { ...oldVal.data, image: undefined },
		}))
	}

	const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader()
		if (!e.target.files) return
		reader.readAsDataURL(e.target.files[0])

		reader.onload = s => {
			setState(oldVal => ({
				id: oldVal.id,
				data: { ...oldVal.data, image: s.target?.result as string },
			}))
		}
	}

	return (
		<Modal title="Edit contact" setShow={setShow}>
			<form className="flex flex-col gap-2 px-1 py-2" onSubmit={onSumbit}>
				<div className="col-span-full py-2">
					<label
						htmlFor="pfp"
						className="flex flex-col justify-center items-center cursor-pointer"
					>
						{state.data.image || contact.image ? (
							<div className="p-12 h-[8rem] w-[8rem] aspect-square relative">
								<Image
									src={
										(state.data.image as string) ||
										(contact.image as string)
									}
									fill={true}
									alt="pfp"
									className="h-full w-full rounded-md object-cover"
								/>
								<button className="absolute h-full w-full inset-0 p-8 bg-black opacity-0 hover:opacity-40">
									<RxCrossCircled
										onClick={clearImage}
										className="h-full w-full text-white bg-black rounded-md"
									/>
								</button>
							</div>
						) : (
							<div className="rounded-md h-[8rem] w-[8rem] bg-red-500 relative">
								<RiImageAddLine className="h-full text-red-200 text-6xl aspect-square absolute left-1/2 -translate-x-1/2" />
							</div>
						)}
					</label>
					<input
						type="file"
						accept="image/*"
						id="pfp"
						className="hidden"
						onChange={loadImage}
					/>
				</div>
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
