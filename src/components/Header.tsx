import { MdOutlinePersonAddAlt } from "react-icons/md"
import { FiLogOut } from "react-icons/fi"
import { BiUserCircle } from "react-icons/bi"
import AddContact from "@/components/AddContact"
import { useState } from "react"
import { trpc } from "@/utils/trpc"
import { useRouter } from "next/router"
import Spinner from "./Spinner"

const Header = () => {
	const [showAdd, setShowAdd] = useState(false)
	const [showHover, setShowHover] = useState(false)
	const router = useRouter()
	const { data, status } = trpc.auth.user.useQuery()
	const { mutate } = trpc.auth.logout.useMutation({
		onSuccess: data => {
			if (data.success) router.push("/auth")
		},
	})

	const logout = () => {
		mutate()
	}

	if (status == "error") {
		router.push("/auth")
		return <></>
	}

	return (
		<nav className="flex h-[8%] bg-[#1d2e57] items-center gap-4 px-4 text-white">
			<svg
				viewBox="0 0 320 108.28"
				xmlns="http://www.w3.org/2000/svg"
				className="mr-auto h-4/5"
			>
				<g
					transform="matrix(7.3965 0 0 7.3965 -2.2189 -42.012)"
					fill="#a393eb"
				>
					<path d="m9.65 10.07q-0.87-0.53-1.69-0.53t-1.49 0.43-1.04 1.19-0.37 1.72 0.37 1.73 1.04 1.21 1.49 0.44q0.76 0 1.63-0.45t1.55-1.19l2.68 2.86q-1.18 1.3-2.83 2.07t-3.27 0.77q-2.12 0-3.81-0.95t-2.65-2.64-0.96-3.79q0-2.08 0.98-3.73t2.71-2.59 3.91-0.94q1.6 0 3.22 0.71t2.7 1.89l-2.68 3.18q-0.62-0.86-1.49-1.39z" />
				</g>
				<g
					transform="matrix(1.6744 0 0 1.6744 119.5 32.489)"
					fill="#f5c7f7"
				>
					<path d="m9.65 10.07q-0.87-0.53-1.69-0.53t-1.49 0.43-1.04 1.19-0.37 1.72 0.37 1.73 1.04 1.21 1.49 0.44q0.76 0 1.63-0.45t1.55-1.19l2.68 2.86q-1.18 1.3-2.83 2.07t-3.27 0.77q-2.12 0-3.81-0.95t-2.65-2.64-0.96-3.79q0-2.08 0.98-3.73t2.71-2.59 3.91-0.94q1.6 0 3.22 0.71t2.7 1.89l-2.68 3.18q-0.62-0.86-1.49-1.39zm16.54-3.45q1.76 0.94 2.75 2.6t0.99 3.74q0 2.1-0.99 3.78t-2.75 2.63-3.96 0.95-3.96-0.95-2.75-2.63-0.99-3.78 0.99-3.76 2.75-2.59 3.96-0.93 3.96 0.94zm-5.39 3.37q-0.69 0.45-1.1 1.23t-0.41 1.76 0.41 1.77 1.1 1.25 1.49 0.46 1.46-0.45 1.04-1.25 0.38-1.78-0.38-1.77-1.04-1.23-1.46-0.44-1.49 0.45zm20.319-4.01h4.2v14.02h-3.88l-5.52-7.16v7.16h-4.22v-14.02h3.88l5.54 7.2v-7.2zm5.7695 0h12.62v3.66h-4v10.36h-4.64v-10.36h-3.98v-3.66zm24.43 14.02-0.7-1.98h-5.26l-0.72 1.98h-4.76l5.92-14.02h4.76l5.7 14.02h-4.94zm-4.76-5.3h2.92l-1.44-4.1zm19.62-4.63q-0.87-0.53-1.69-0.53t-1.49 0.43-1.04 1.19-0.37 1.72 0.37 1.73 1.04 1.21 1.49 0.44q0.76 0 1.63-0.45t1.55-1.19l2.68 2.86q-1.18 1.3-2.83 2.07t-3.27 0.77q-2.12 0-3.81-0.95t-2.65-2.64-0.96-3.79q0-2.08 0.98-3.73t2.71-2.59 3.91-0.94q1.6 0 3.22 0.71t2.7 1.89l-2.68 3.18q-0.62-0.86-1.49-1.39zm4.6795-4.09h12.62v3.66h-4v10.36h-4.64v-10.36h-3.98v-3.66zm25.15 0.64q1.76 0.94 2.75 2.6t0.99 3.74q0 2.1-0.99 3.78t-2.75 2.63-3.96 0.95-3.96-0.95-2.75-2.63-0.99-3.78 0.99-3.76 2.75-2.59 3.96-0.93 3.96 0.94zm-5.39 3.37q-0.69 0.45-1.1 1.23t-0.41 1.76 0.41 1.77 1.1 1.25 1.49 0.46 1.46-0.45 1.04-1.25 0.38-1.78-0.38-1.77-1.04-1.23-1.46-0.44-1.49 0.45z" />
				</g>
			</svg>
			<div
				className="flex items-center gap-1 hover:underline hover:cursor-pointer"
				onClick={() => setShowAdd(true)}
			>
				<MdOutlinePersonAddAlt />
				<li className="list-none hidden sm:block">Add Contact</li>
			</div>
			{status == "loading" ? (
				<Spinner />
			) : (
				<div
					className="flex items-center gap-1 hover:underline hover:cursor-pointer relative w-40"
					onMouseOver={() => {
						setShowHover(true)
					}}
					onMouseOut={() => {
						setShowHover(false)
					}}
				>
					{showHover ? (
						<>
							<FiLogOut />
							<li
								className="list-none hidden sm:block"
								onClick={logout}
							>
								Logout
							</li>
						</>
					) : (
						<>
							<BiUserCircle />
							<li className="list-none hidden sm:block uppercase">
								{data.username}
							</li>
						</>
					)}
				</div>
			)}
			{showAdd && <AddContact setShow={setShowAdd} />}
		</nav>
	)
}

export default Header
