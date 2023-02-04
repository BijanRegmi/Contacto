import { IoIosArrowBack } from "react-icons/io"
import { AiOutlineEdit } from "react-icons/ai"
import { useRouter } from "next/router"
import { trpc } from "@/utils/trpc"

const Details = () => {
	const router = useRouter()
	const _id = router.query?.id
	const id = typeof _id == "string" ? _id : ""

	const { status, data } = trpc.records.get.useQuery({ id })

	if (status == "loading") return <div>Loading Record</div>
	else if (status == "error") return <div>Failed to load record</div>

	return (
		<div className="h-full flex flex-col">
			<div className="flex h-12 bg-black text-white items-center">
				<IoIosArrowBack className="text-2xl h-full mx-4" />
				<span className="flex-grow" />
				<button
					type="submit"
					className="bg-red-300 px-6 h-4/5 mx-4 rounded-md text-black"
				>
					<AiOutlineEdit />
				</button>
			</div>
			<div>
				<div className="rounded-full h-[8rem] w-[8rem] bg-red-500 relative">
					<span className="text-red-200 text-6xl aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
						{data?.firstname[0]}
					</span>
				</div>
				<span>
					{data?.firstname} {data?.lastname}
				</span>
				<span>{data?.company}</span>
			</div>
		</div>
	)
}

export default Details
