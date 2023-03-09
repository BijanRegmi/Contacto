import mysql from "mysql2/promise"
import path from "path"
import { config } from "dotenv"
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2"

config({ path: path.resolve(__dirname + "/../../../../../.env") })

declare global {
	var db: {
		pool: mysql.Pool
		query: <
			T extends
				| RowDataPacket[][]
				| RowDataPacket[]
				| OkPacket
				| OkPacket[]
				| ResultSetHeader
		>(
			query: string,
			params: any[]
		) => Promise<[T, FieldPacket[]]>
	}
}

export const dbConn = async () => {
	if (global.db) return global.db

	console.log("Creating new database connection.")
	const pool = mysql.createPool({
		connectionLimit: 10,
		host: process.env.SQL_HOST,
                port: parseInt(process.env.SQL_PORT as string) || 3306,
		user: process.env.SQL_USER,
		password: process.env.SQL_PASS,
		database: process.env.SQL_DB,
	})

	const query = async <
		T extends
			| RowDataPacket[][]
			| RowDataPacket[]
			| OkPacket
			| OkPacket[]
			| ResultSetHeader
	>(
		query: string,
		params: any[]
	) => {
		return pool.query<T>(query, params)
	}

	global.db = {
		pool,
		query,
	}

	return { pool, query }
}
