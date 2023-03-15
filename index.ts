import { RowDataPacket } from "mysql2"

export interface QueryResponse extends RowDataPacket {
    id: string
}

export interface UserResponse extends RowDataPacket {
    email: string
    username: string
    id: string
}

export interface RecordResponse extends RowDataPacket {
    id: string
    firstname: string
    lastname: string
    company: string
    phone: string
    email: string
    image: string
}
