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

type AddInput = inferRouterInputs<AppRouter>["records"]["add"]

const AddContact = ({
	setShow,
}: {
	setShow: Dispatch<SetStateAction<boolean>>
}) => {
	const [state, setState] = useState<AddInput>({ firstname: "", phone: "" })

	const { mutate } = trpc.records.add.useMutation({
		onSuccess: data => {
			if (data.success) setShow(false)
		},
	})

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setState(oldVal => ({ ...oldVal, [e.target.name]: e.target.value }))
	}

	const onSumbit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		mutate(state)
	}

	const clearImage = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
		e.stopPropagation()
		e.preventDefault()
		setState(oldVal => ({ ...oldVal, image: undefined }))
	}

	const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader()
		if (!e.target.files) return
		reader.readAsDataURL(e.target.files[0])

		reader.onload = s => {
			setState(oldVal => ({
				...oldVal,
				image: s.target?.result as string,
			}))
		}
	}

	return (
		<Modal title="Add contact" setShow={setShow}>
			<form className="flex flex-col gap-2 px-1 py-2" onSubmit={onSumbit}>
				<div className="col-span-full py-2">
					<label
						htmlFor="pfp"
						className="flex flex-col justify-center items-center cursor-pointer"
					>
						{!state.image ? (
							<div className="rounded-md h-[8rem] w-[8rem] bg-red-500 relative">
								<RiImageAddLine className="h-full text-red-200 text-6xl aspect-square absolute left-1/2 -translate-x-1/2" />
							</div>
						) : (
							<div className="p-12 h-[8rem] w-[8rem] aspect-square relative">
								<Image
									src={state.image}
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
						value={state.firstname}
						onChange={onChange}
						required
					/>
				</div>
				<div className="relative border-b border-solid border-slate-400 hover:border-slate-900">
					<AiOutlineUser className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1 hidden" />
					<input
						className="w-full px-6 py-2 focus:outline-none rounded-md text-sm"
						placeholder="Lastname"
						name="lastname"
						type="text"
						value={state.lastname}
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
						value={state.company}
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
						value={state.phone}
						onChange={onChange}
						required
					/>
				</div>
				<div className="relative border-b border-solid border-slate-400 hover:border-slate-900">
					<AiOutlineMail className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
					<input
						className="w-full px-6 py-2 focus:outline-none rounded-md text-sm"
						placeholder="Email"
						name="email"
						type="email"
						value={state.email}
						onChange={onChange}
					/>
				</div>
				<div className="self-end flex flex-row-reverse gap-4">
					<button
						className="bg-red-400 px-4 py-1 rounded-sm"
						type="button"
						onClick={() => {
							setShow(false)
						}}
					>
						Cancel
					</button>
					<button className="bg-green-400 px-4 py-1 rounded-sm">
						Add
					</button>
				</div>
			</form>
		</Modal>
	)
}

export default AddContact
