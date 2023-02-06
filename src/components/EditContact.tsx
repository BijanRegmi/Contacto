import { Record } from "@/server/controllers/listRecords"
import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useState,
	MouseEvent,
	useEffect,
	useContext,
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
import { ContextActionKind } from "@/utils/reducer"
import { AppContext } from "@/pages/_app"

type EditInput = inferRouterInputs<AppRouter>["records"]["edit"]

const EditContact = ({
	setShow,
	contact,
}: {
	setShow: Dispatch<SetStateAction<boolean>>
	contact: Record
}) => {
	const [state, setState] = useState<EditInput>({ id: contact.id, data: {} })
	const [defImg, setDefImg] = useState<string | undefined>(undefined)
	const { dispatch } = useContext(AppContext)
	const utils = trpc.useContext()

	useEffect(() => {
		setDefImg(contact.image)
	}, [contact.image])

	const { mutate } = trpc.records.edit.useMutation({
		onSuccess: data => {
			if (data.success) setShow(false)
			utils.records.list.invalidate()
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
		setDefImg(undefined)
		setState(oldVal => ({
			id: oldVal.id,
			data: { ...oldVal.data, image: "" },
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
						{defImg || state.data.image ? (
							<div className="p-12 h-32 w-32 aspect-square relative">
								<Image
									src={
										(defImg as string) ||
										(state.data.image as string)
									}
									fill={true}
									alt="pfp"
									className="h-full w-full rounded-md object-cover"
								/>
								<button
									title="Remove Image"
									className="absolute h-full w-full inset-0 p-8 rounded-md bg-slate-900 opacity-0 hover:opacity-60"
								>
									<RxCrossCircled
										onClick={clearImage}
										className="h-full w-full text-slate-100 bg-slate-900 rounded-md"
									/>
								</button>
							</div>
						) : (
							<div
								title="Add Image"
								className="rounded-md h-32 w-32 bg-slate-800 relative"
							>
								<RiImageAddLine className="h-full text-slate-300 text-6xl aspect-square absolute left-1/2 -translate-x-1/2" />
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
				<div className="self-end flex flex-row-reverse gap-4 text-slate-100">
					<button
						className="bg-slate-900 px-4 py-1 rounded-sm"
						type="button"
						onClick={() => {
							setShow(false)
						}}
					>
						Cancel
					</button>
					<button className="bg-slate-900 px-4 py-1 rounded-sm">
						Save
					</button>
				</div>
			</form>
		</Modal>
	)
}

export default EditContact
