import { BsBuilding, BsTelephone } from "react-icons/bs"
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai"
import { RxCross1 } from "react-icons/rx"
import { RiImageAddFill } from "react-icons/ri"
import { ChangeEvent, FormEvent, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { MouseEvent } from "react"
import { trpc } from "@/pages/utils/trpc"

const initState = {
	firstname: "",
	lastname: "",
	company: "",
	phone: "",
	email: "",
}

const AddNew = () => {
	const router = useRouter()

	const AddContact = trpc.records.add.useMutation({
		onSuccess: data => {
			if (data.success) router.push("/")
		},
		onError: err => {
			console.log(err.message)
		},
	})

	const [pfp, setPfp] = useState<string | ArrayBuffer | null | undefined>(
		null
	)
	const [data, setData] = useState(initState)

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData(oldVal => ({ ...oldVal, [e.target.name]: e.target.value }))
	}

	const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader()
		const selectedFile = e.target.files && e.target.files[0]
		if (selectedFile) reader.readAsDataURL(selectedFile)

		reader.onload = readerEvent => setPfp(readerEvent.target?.result)
	}

	const clearImage = (
		e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
	) => {
		e.stopPropagation()
		e.preventDefault()
		setPfp(null)
	}

	const cancelAdd = () => {
		router.push("/")
	}

	const submitAdd = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		AddContact.mutate(data)
	}

	return (
		<form className="h-full flex flex-col" onSubmit={submitAdd}>
			<div className="flex h-12 bg-black text-white items-center">
				<RxCross1
					onClick={cancelAdd}
					className="text-2xl h-full mx-4 cursor-pointer"
				/>
				<span className="flex-grow">Create contact</span>
				<button
					type="submit"
					className="bg-red-300 px-6 h-4/5 mx-4 rounded-md text-black"
				>
					Save
				</button>
			</div>
			<div className="grid grid-cols-12 auto-rows-max gap-y-6 p-4 bg-black text-white h-full">
				<div className="col-span-full py-2">
					<label
						htmlFor="pfp"
						className="flex flex-col justify-center items-center cursor-pointer"
					>
						{!pfp ? (
							<>
								<div className="rounded-full h-[8rem] w-[8rem] bg-red-500 relative">
									<RiImageAddFill className="h-full text-red-200 text-6xl aspect-square absolute left-1/2 -translate-x-1/2" />
								</div>
								<span>Add Picture</span>
							</>
						) : (
							<>
								<div className="p-12 h-[8rem] w-[8rem] aspect-square relative">
									<Image
										src={pfp}
										fill={true}
										alt="pfp"
										className="h-full w-full rounded-full object-cover"
									/>
								</div>
								<span onClick={clearImage}>Remove Picture</span>
							</>
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
				<AiOutlineUser className="h-full" />
				<input
					type="text"
					name="firstname"
					placeholder="First name"
					className="border border-white bg-black col-span-11 focus:border-red-300 focus:outline-none rounded-sm p-2"
					onChange={onChange}
				/>
				<div />
				<input
					type="text"
					name="lastname"
					placeholder="Last name"
					className="border border-white bg-black col-span-11 focus:border-red-300 focus:outline-none rounded-sm p-2 mb-2"
					onChange={onChange}
				/>
				<BsBuilding className="h-full" />
				<input
					type="text"
					name="company"
					placeholder="Company"
					className="border border-white bg-black col-span-11 focus:border-red-300 focus:outline-none rounded-sm p-2 mb-2"
					onChange={onChange}
				/>
				<BsTelephone className="h-full" />
				<input
					type="text"
					name="phone"
					placeholder="Phone"
					className="border border-white bg-black col-span-11 focus:border-red-300 focus:outline-none rounded-sm p-2 mb-2"
					onChange={onChange}
				/>
				<AiOutlineMail className="h-full" />
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="border border-white bg-black col-span-11 focus:border-red-300 focus:outline-none rounded-sm p-2 mb-2"
					onChange={onChange}
				/>
			</div>
		</form>
	)
}

export default AddNew
