import "@/styles/globals.css"
import type { AppProps, AppType } from "next/app"
import { trpc } from "@/utils/trpc"
import { createContext, useReducer } from "react"
import Alert from "@/components/Alert"
import { Context, initialContextValue, reducer } from "@/utils/reducer"

export const AppContext = createContext<Context>({} as Context)

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
	const [state, dispatch] = useReducer(reducer, initialContextValue)

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			<Component {...pageProps} />
			<Alert />
		</AppContext.Provider>
	)
}

export default trpc.withTRPC(MyApp)
