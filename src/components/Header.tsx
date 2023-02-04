import { TiContacts } from "react-icons/ti"
import { MdOutlinePersonAddAlt } from "react-icons/md"
import { FiLogOut } from "react-icons/fi"

const Header = () => {
	return (
		<nav className="flex h-[8%] bg-red-400 items-center gap-4 px-2">
			<h1 className="text-4xl mr-auto">PHONEBOOK</h1>
			<div className="flex items-center gap-1 hover:underline hover:cursor-pointer">
				<TiContacts />
				<li className="list-none hidden sm:block">My Contacts</li>
			</div>
			<div className="flex items-center gap-1 hover:underline hover:cursor-pointer">
				<MdOutlinePersonAddAlt />
				<li className="list-none hidden sm:block">Add Contact</li>
			</div>
			<div className="flex items-center gap-1 hover:underline hover:cursor-pointer">
				<FiLogOut />
				<li className="list-none hidden sm:block">Logout</li>
			</div>
		</nav>
	)
}

export default Header
