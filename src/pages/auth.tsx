import { ChangeEvent, FormEvent, useState } from "react"
import { trpc } from "@/pages/utils/trpc"
import { useRouter } from "next/router"

const initialState = {
	email: "",
	password: "",
	isLogin: true,
}

export default function Auth() {
	const [values, setValues] = useState(initialState)
	const router = useRouter()

	var _action = values.isLogin ? trpc.auth.login : trpc.auth.register
	const mutation = _action.useMutation({
		onSuccess: data => {
			if (data.success) router.push("/")
		},
		onError: err => {
			console.log(err.message)
		},
	})

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues(oldVal => ({ ...oldVal, [e.target.name]: e.target.value }))
	}

	const toggleMode = () => {
		setValues(oldVal => ({ ...oldVal, isLogin: !oldVal.isLogin }))
	}

	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		mutation.mutate({ email: values.email, password: values.password })
	}

	return (
		<div>
			<form onSubmit={submit}>
				<input
					type="email"
					name="email"
					value={values.email}
					onChange={onChange}
				/>
				<input
					type="password"
					name="password"
					value={values.password}
					onChange={onChange}
				/>
				<button>{values.isLogin ? "Login" : "Register"}</button>
			</form>
			<span onClick={toggleMode}>
				{values.isLogin
					? "New user? Register Here."
					: "Already have an account? Login Here."}
			</span>
		</div>
	)
}
