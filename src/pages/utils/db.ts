import { Client } from "pg"
import path from "path"
import { config } from "dotenv"

config({ path: path.resolve(__dirname + "/../../../../../.env") })

declare global {
	var db: Client
}

export const dbConn = async () => {
	if (global.db) return global.db

	console.log("Creating new database connection.")
	const client = new Client({})
	await client.connect()

	global.db = client

	return client
}
