import "@/styles/globals.css"
import type { AppProps, AppType } from "next/app"
import { trpc } from "@/pages/utils/trpc"

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<div className="flex justify-center my-2">P H O N E B O O K</div>
			<Component {...pageProps} />
		</>
	)
}

export default trpc.withTRPC(MyApp)
