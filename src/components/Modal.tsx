import { ReactNode, Dispatch, SetStateAction } from "react"

const Modal = ({
	title,
	children,
	setShow,
}: {
	title: string
	children?: ReactNode
	setShow: Dispatch<SetStateAction<boolean | string>>
}) => {
	return (
		<div className="fixed inset-0 z-10">
			<div
				className="fixed inset-0 w-full h-full bg-black opacity-40"
				onClick={() => setShow(false)}
			/>
			<div className="flex items-center min-h-screen px-4 py-8">
				<div className="flex px-4 mx-auto">
					<div className="relative p-4 mx-auto bg-white rounded-md drop-shadow-3xl max-h-[95vh] overflow-auto">
						<div className="mt-2 text-center sm:ml-4 sm:text-left">
							<h4 className="text-2xl text-center mb-4">
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