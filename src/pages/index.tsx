import { trpc } from "./utils/trpc"

export default function Home() {
	const hello = trpc.hello.useQuery({ name: "clients" })
	if (!hello.data) {
		return <div>Loading...</div>
	}
	return <div>{hello.data.greeting}</div>
}
