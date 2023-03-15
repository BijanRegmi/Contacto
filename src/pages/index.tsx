import { trpc } from "@/utils/trpc"
import Header from "@/components/Header"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import DeleteContact from "@/components/DeleteContact"
import RecordEntry from "@/components/RecordEntry"
import EditContact from "@/components/EditContact"
import { Record } from "@/server/controllers/listRecords"
import { HiOutlineUserCircle } from "react-icons/hi"
import Head from "next/head"
import { AppContext } from "./_app"
import { useRouter } from "next/router"
import { AlertType, ContextActionKind } from "@/utils/reducer"

export default function Home() {
    const router = useRouter()
    const { dispatch } = useContext(AppContext)

    const { status: userStatus, data: userData } = trpc.auth.user.useQuery(
        undefined,
        {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            onError: err => {
                router.push("/auth")
                dispatch({
                    type: ContextActionKind.SPAWNALERT,
                    payload: {
                        type: AlertType.ERROR,
                        message: err.message,
                    },
                })
            },
        }
    )

    const { data } = trpc.records.list.useQuery(undefined, {
        select: data => {
            data.sort((a, b) => a.firstname.localeCompare(b.firstname))
            return data
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })

    const [delCont, setDelCont] = useState<boolean | Record>(false)
    const [editCont, setEditCont] = useState<boolean | Record>(false)

    return (
        <div className="h-full">
            <Head>
                <title>Contacto</title>
            </Head>
            <Header status={userStatus} data={userData} />
            <div className="bg-[#88afce] h-[92%] flex flex-col items-center">
                <div className="container p-2 mx-auto sm:p-4 text-gray-100">
                    <div className="overflow-x-auto rounded-md">
                        <table className="w-full p-6 text-xs text-left whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-900 border-solid border-b-2 border-blue-900">
                                    <th className="p-3 flex justify-center items-center">
                                        <HiOutlineUserCircle className="text-xl" />
                                    </th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Phone</th>
                                    <th className="p-3">Company</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800">
                                {data?.map(contact => (
                                    <RecordEntry
                                        key={contact.id}
                                        contact={contact}
                                        setDelCont={setDelCont}
                                        setEditCont={setEditCont}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {delCont && (
                <DeleteContact
                    setShow={setDelCont as Dispatch<SetStateAction<boolean>>}
                    contact={delCont as Record}
                />
            )}
            {editCont && (
                <EditContact
                    setShow={setEditCont as Dispatch<SetStateAction<boolean>>}
                    contact={editCont as Record}
                />
            )}
        </div>
    )
}
