import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useState,
    MouseEvent,
    useContext,
} from "react"
import Modal from "@/components/Modal"
import { trpc } from "@/utils/trpc"
import { inferRouterInputs } from "@trpc/server"
import { AppRouter } from "@/server/routers/_app"
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai"
import { BsBuilding } from "react-icons/bs"
import { RiImageAddLine } from "react-icons/ri"
import { RxCrossCircled } from "react-icons/rx"
import Image from "next/image"
import { AppContext } from "@/pages/_app"
import { AlertType, ContextActionKind } from "@/utils/reducer"

type AddInput = inferRouterInputs<AppRouter>["records"]["add"]

const AddContact = ({
    setShow,
}: {
    setShow: Dispatch<SetStateAction<boolean>>
}) => {
    const [state, setState] = useState<AddInput>({ firstname: "", phone: "" })
    const { dispatch } = useContext(AppContext)
    const utils = trpc.useContext()

    const { mutate } = trpc.records.add.useMutation({
        onSuccess: data => {
            if (data.success) {
                setShow(false)
                utils.records.list.invalidate()
                dispatch({
                    type: ContextActionKind.SPAWNALERT,
                    payload: {
                        type: AlertType.SUCCESS,
                        message: "Successfully added.",
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

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(oldVal => ({ ...oldVal, [e.target.name]: e.target.value }))
    }

    const onSumbit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate(state)
    }

    const clearImage = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
        setState(oldVal => ({ ...oldVal, image: undefined }))
    }

    const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        if (!e.target.files) return
        reader.readAsDataURL(e.target.files[0])

        reader.onload = s => {
            setState(oldVal => ({
                ...oldVal,
                image: s.target?.result as string,
            }))
        }
    }

    return (
        <Modal title="Add contact" setShow={setShow}>
            <form
                className="flex flex-col gap-2 px-1 py-2 text-black"
                onSubmit={onSumbit}
            >
                <div className="col-span-full py-2">
                    <label
                        htmlFor="pfp"
                        className="flex flex-col justify-center items-center cursor-pointer"
                    >
                        {!state.image ? (
                            <div
                                title="Add Image"
                                className="rounded-md h-32 w-32 bg-slate-800 relative"
                            >
                                <RiImageAddLine className="h-full text-slate-300 text-6xl aspect-square absolute left-1/2 -translate-x-1/2" />
                            </div>
                        ) : (
                            <div className="p-12 h-32 w-32 aspect-square relative">
                                <Image
                                    src={state.image}
                                    fill={true}
                                    alt="pfp"
                                    className="h-full w-full rounded-md object-cover"
                                />
                                <button
                                    title="Remove Image"
                                    className="absolute h-full w-full inset-0 p-8 rounded-md bg-slate-900 opacity-0 hover:opacity-60"
                                >
                                    <RxCrossCircled
                                        onClick={clearImage}
                                        className="h-full w-full text-slate-100 bg-slate-900 rounded-md"
                                    />
                                </button>
                            </div>
                        )}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="pfp"
                        className="hidden"
                        onChange={loadImage}
                    />
                </div>
                <div className="relative">
                    <AiOutlineUser className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
                    <input
                        className="w-full px-6 py-2 focus:outline-none rounded-md text-sm border-b border-solid border-slate-400 hover:border-slate-900"
                        placeholder="Firstname"
                        name="firstname"
                        type="text"
                        value={state.firstname}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="relative">
                    <AiOutlineUser className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1 hidden" />
                    <input
                        className="w-full px-6 py-2 focus:outline-none rounded-md text-sm border-b border-solid border-slate-400 hover:border-slate-900"
                        placeholder="Lastname"
                        name="lastname"
                        type="text"
                        value={state.lastname}
                        onChange={onChange}
                    />
                </div>
                <div className="relative">
                    <AiOutlinePhone className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
                    <input
                        className="w-full px-6 py-2 focus:outline-none rounded-md text-sm border-b border-solid border-slate-400 hover:border-slate-900"
                        placeholder="Phone"
                        name="phone"
                        type="text"
                        value={state.phone}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="relative">
                    <BsBuilding className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
                    <input
                        className="w-full px-6 py-2 focus:outline-none rounded-md text-sm border-b border-solid border-slate-400 hover:border-slate-900"
                        placeholder="Company"
                        name="company"
                        type="text"
                        value={state.company}
                        onChange={onChange}
                    />
                </div>
                <div className="relative">
                    <AiOutlineMail className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
                    <input
                        className="w-full px-6 py-2 focus:outline-none rounded-md text-sm border-b border-solid border-slate-400 hover:border-slate-900"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={state.email}
                        onChange={onChange}
                    />
                </div>
                <div className="self-end flex flex-row-reverse gap-4 text-slate-100">
                    <button
                        className="bg-slate-900 px-4 py-1 rounded-sm"
                        type="button"
                        onClick={() => {
                            setShow(false)
                        }}
                    >
                        Cancel
                    </button>
                    <button className="bg-slate-900 px-4 py-1 rounded-sm">
                        Add
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default AddContact
