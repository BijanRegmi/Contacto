import { ReactNode, Dispatch, SetStateAction } from "react"

const Modal = ({
    title,
    children,
    setShow,
}: {
    title: string
    children?: ReactNode
    setShow: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <div className="fixed inset-0 z-10">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-70"
                onClick={() => setShow(false)}
            />
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="flex px-4 mx-auto">
                    <div className="relative p-4 mx-auto bg-slate-300 rounded-md drop-shadow-3xl max-h-[95vh] overflow-auto">
                        <div className="text-center m-2">
                            <h4 className="text-2xl text-center text-slate-800 mb-4">
                                {title}
                            </h4>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
