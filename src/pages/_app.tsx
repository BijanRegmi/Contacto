import "@/styles/globals.css"
import type { AppProps, AppType } from "next/app"
import { trpc } from "@/pages/utils/trpc"

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
