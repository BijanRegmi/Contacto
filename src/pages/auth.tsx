import { ChangeEvent, FormEvent, useState } from "react"
import { trpc } from "@/utils/trpc"
import { useRouter } from "next/router"
import Image from "next/image"
import { AiOutlineMail, AiOutlineUser, AiOutlineLogin } from "react-icons/ai"
import { RiLockPasswordLine } from "react-icons/ri"
import Spinner from "@/components/Spinner"
import Head from "next/head"

enum AuthMethod {
	LOGIN,
	REGISTER,
}

const initialState = {
	email: "",
	password: "",
	username: "",
	state: AuthMethod.LOGIN,
}

const texts: { title: string; span: string; button: string }[] = [
	{
		title: "Login",
		span: "Don't have an account?",
		button: "Register Here",
	},
	{
		title: "Register",
		span: "Already have an account?",
		button: "Login Here",
	},
]

export default function Auth() {
	const [values, setValues] = useState(initialState)
	const router = useRouter()

	const { mutate: login, status: loginStatus } = trpc.auth.login.useMutation({
		onSuccess: data => {
			if (data.success) router.push("/")
		},
	})
	const { mutate: register, status: registerStatus } =
		trpc.auth.register.useMutation({
			onSuccess: data => {
				if (data.success) router.push("/")
			},
		})

	const status =
		values.state == AuthMethod.LOGIN ? loginStatus : registerStatus

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues(oldVal => ({ ...oldVal, [e.target.name]: e.target.value }))
	}

	const toggleMode = () => {
		setValues(oldVal => {
			const newVal =
				oldVal.state == AuthMethod.LOGIN
					? AuthMethod.REGISTER
					: AuthMethod.LOGIN
			return { ...oldVal, state: newVal }
		})
	}

	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { state, email, password, username } = values
		if (state == AuthMethod.LOGIN) login({ email, password })
		else register({ email, password, username })
	}

	return (
		<div className="h-full w-full bg-slate-500 py-32 px-80">
			<Head>
				<title>{`Contacto | ${texts[values.state].title}`}</title>
			</Head>
			<div className="flex h-full w-full border border-slate-900 border-solid rounded-2xl">
				<section className="w-1/3 relative">
					<Image
						src="/authBg.jpg"
						alt="Phone background"
						fill
						style={{
							borderTopLeftRadius: "1rem",
							borderBottomLeftRadius: "1rem",
						}}
					/>
				</section>
				<section className="bg-[#88afce] w-2/3 rounded-r-2xl py-2 h-full">
					<h1 className="text-2xl text-center h-[10%]">
						{texts[values.state].title}
					</h1>
					<form
						className="flex flex-col items-center justify-center gap-4 h-[90%]"
						onSubmit={submit}
					>
						{values.state == AuthMethod.REGISTER && (
							<div className="relative w-2/3">
								<AiOutlineUser className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
								<input
									className="w-full px-6 py-2 focus:outline-none rounded-md text-sm"
									placeholder="Username"
									name="username"
									type="text"
									value={values.username}
									onChange={onChange}
								/>
							</div>
						)}
						<div className="relative w-2/3">
							<AiOutlineMail className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
							<input
								className="w-full px-6 py-2 focus:outline-none rounded-md text-sm"
								placeholder="Email"
								name="email"
								type="email"
								value={values.email}
								onChange={onChange}
							/>
						</div>
						<div className="relative w-2/3">
							<RiLockPasswordLine className="absolute top-1/2 -translate-y-1/2 w-4 h-4 left-1" />
							<input
								className="w-full px-6 py-2 focus:outline-none rounded-md text-sm"
								placeholder="Password"
								name="password"
								type="password"
								value={values.password}
								onChange={onChange}
							/>
						</div>
						<button className="py-2 w-1/2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center">
							{status == "loading" ? (
								<Spinner />
							) : (
								<AiOutlineLogin className="mr-2" />
							)}
							<span>{texts[values.state].title}</span>
						</button>
						<span>{texts[values.state].span}</span>
						<button onClick={toggleMode} type="button">
							{texts[values.state].button}
						</button>
					</form>
				</section>
			</div>
		</div>
	)
}
