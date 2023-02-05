import { TiContacts } from "react-icons/ti"
import { MdOutlinePersonAddAlt } from "react-icons/md"
import { FiLogOut } from "react-icons/fi"
import AddContact from "@/components/AddContact"
import { useState } from "react"

const Header = () => {
	const [showAdd, setShowAdd] = useState(false)

	return (
		<nav className="flex h-[8%] bg-red-400 items-center gap-4 px-2">
			<h1 className="text-4xl mr-auto">PHONEBOOK</h1>
			<div className="flex items-center gap-1 hover:underline hover:cursor-pointer">
				<TiContacts />
				<li className="list-none hidden sm:block">My Contacts</li>
			</div>
			<div
				className="flex items-center gap-1 hover:underline hover:cursor-pointer"
				onClick={() => setShowAdd(true)}
			>
				<MdOutlinePersonAddAlt />
				<li className="list-none hidden sm:block">Add Contact</li>
			</div>
			<div className="flex items-center gap-1 hover:underline hover:cursor-pointer">
				<FiLogOut />
				<li className="list-none hidden sm:block">Logout</li>
			</div>
			{showAdd && <AddContact setShow={setShowAdd} />}
		</nav>
	)
}

export default Header
