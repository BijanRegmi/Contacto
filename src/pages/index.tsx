import { trpc } from "@/utils/trpc"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import { useState } from "react"
import DeleteContact from "@/components/DeleteContact"
import RecordEntry from "@/components/RecordEntry"

export default function Home() {
	const router = useRouter()
	const { status } = trpc.auth.user.useQuery(undefined, {
		onError: () => {
			router.push("/auth")
		},
	})

	const { status: statusRecord, data } = trpc.records.list.useQuery(
		undefined,
		{
			select: data => {
				data.sort((a, b) => a.firstname.localeCompare(b.firstname))
				return data
			},
		}
	)

	const [delCont, setDelCont] = useState<boolean | string>(false)

	if (status == "loading") return <div>Loading</div>
	if (statusRecord == "loading") return <div>Fetching List</div>

	return (
		<div className="h-full bg-green-400">
			<Header />
			<div className="bg-blue-400 h-[92%] flex flex-col items-center">
				<div className="container p-2 mx-auto sm:p-4 text-gray-100">
					<h2 className="mb-4 text-2xl font-semibold leading-tight">
						Contacts
					</h2>
					<div className="overflow-x-auto">
						<table className="w-full p-6 text-xs text-left whitespace-nowrap">
							<thead>
								<tr className="bg-gray-700">
									<th className="p-3">#</th>
									<th className="p-3">FirstName</th>
									<th className="p-3">LastName</th>
									<th className="p-3">Company</th>
									<th className="p-3">Phone</th>
									<th className="p-3">Email</th>
									<th className="p-3">Actions</th>
								</tr>
							</thead>
							<tbody className="border-b bg-gray-900 border-gray-700">
								{data?.map((contact, idx) => (
									<RecordEntry
										key={contact.id}
										contact={contact}
										idx={idx}
										setDelCont={setDelCont}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{delCont && (
				<DeleteContact setShow={setDelCont} id={delCont as string} />
			)}
		</div>
	)
}
