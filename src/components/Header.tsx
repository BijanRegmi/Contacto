import { MdOutlinePersonAddAlt } from "react-icons/md"
import { FiLogOut } from "react-icons/fi"
import { BiUserCircle } from "react-icons/bi"
import AddContact from "@/components/AddContact"
import { useContext, useState } from "react"
import { trpc } from "@/utils/trpc"
import { useRouter } from "next/router"
import Spinner from "./Spinner"
import Logo from "./Logo"
import { AppContext } from "@/pages/_app"
import { AlertType, ContextActionKind } from "@/utils/reducer"

const Header = ({
    status,
    data,
}: {
    status: "error" | "success" | "loading"
    data: { email: string; username: string; id: string } | undefined
}) => {
    const [showAdd, setShowAdd] = useState(false)
    const [showHover, setShowHover] = useState(false)
    const { dispatch } = useContext(AppContext)

    const router = useRouter()

    const { mutate } = trpc.auth.logout.useMutation({
        onSuccess: data => {
            if (data.success) {
                router.push("/auth")
                dispatch({
                    type: ContextActionKind.SPAWNALERT,
                    payload: {
                        type: AlertType.SUCCESS,
                        message: "Logged out.",
                    },
                })
            }
        },
        onError: err => {
            if (err.data?.zodError) {
                err.data.zodError.issues.forEach(issue => {
                    dispatch({
                        type: ContextActionKind.SPAWNALERT,
                        payload: {
                            type: AlertType.ERROR,
                            message: issue.message,
                        },
                    })
                })
            } else {
                dispatch({
                    type: ContextActionKind.SPAWNALERT,
                    payload: {
                        type: AlertType.ERROR,
                        message: err.message,
                    },
                })
            }
        },
    })

    const logout = () => {
        mutate()
    }

    return (
        <nav className="flex h-[8%] bg-[#0b1222] items-center gap-4 px-4">
            <Logo />
            <div
                className="flex items-center gap-1 hover:underline hover:cursor-pointer text-white"
                onClick={() => setShowAdd(true)}
            >
                <MdOutlinePersonAddAlt />
                <li className="list-none hidden sm:block">Add Contact</li>
            </div>
            {status == "loading" ? (
                <Spinner />
            ) : (
                <div
                    className="flex items-center gap-1 hover:underline hover:cursor-pointer relative w-40 text-white"
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
                            <li className="list-none hidden sm:block">
                                {data?.username}
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
