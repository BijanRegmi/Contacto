import { trpc } from "@/pages/utils/trpc"
import { useRouter } from "next/router"
import { FiUserPlus } from "react-icons/fi"
import Image from "next/image"

export default function Home() {
	const router = useRouter()
	const { status } = trpc.auth.user.useQuery(undefined, {
		onError: () => {
			router.push("/auth")
		},
	})

	const { status: statusRecord, data: records } = trpc.records.list.useQuery()

	if (status == "loading") return <div>Loading</div>
	if (statusRecord == "loading") return <div>Fetching List</div>

	const addContact = () => {
		router.push("/new")
	}

	return (
		<div className="flex flex-col gap-2">
			<button className="h-[4rem] flex flex-row items-center align-middle gap-2 bg-black py-1 pl-2 rounded-lg">
				<FiUserPlus className="h-full aspect-square text-white" />
				<span
					className="text-white cursor-pointer"
					onClick={addContact}
				>
					Create new contact
				</span>
			</button>
			{records?.map((contact, idx) => {
				const name = `${contact.firstname} ${contact.lastname}`
				return (
					<div
						key={idx}
						className="h-[4rem] flex flex-row items-center align-middle gap-2 bg-black py-1 pl-2 rounded-lg cursor-pointer"
						onClick={() => router.push(`/${contact.id}`)}
					>
						<div className="h-full aspect-square relative">
							{undefined ? (
								<Image
									src="https://avatars.githubusercontent.com/u/55084653?v=4"
									fill={true}
									alt={name}
									className="h-full w-full rounded-full object-contain"
								/>
							) : (
								<span className="text-white bg-red-400 aspect-square h-full flex justify-center items-center rounded-full text-2xl">
									{name[0]}
								</span>
							)}
						</div>
						<span className="text-white">{name}</span>
					</div>
				)
			})}
		</div>
	)
}
