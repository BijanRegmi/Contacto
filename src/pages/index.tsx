import { trpc } from "@/utils/trpc"
import { useRouter } from "next/router"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import Header from "@/components/Header"

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

	const { mutate: deleteContact } = trpc.records.delete.useMutation()

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
								{data?.map((contact, idx) => {
									return (
										<tr key={contact.id}>
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
														deleteContact({
															id: contact.id,
														})
													}}
												>
													<AiOutlineDelete />
												</button>
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
