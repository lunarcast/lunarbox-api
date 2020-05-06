export interface User {
    id: number
    username: string
    email: string
    admin: boolean
    password: string
}

type EditableProps = "username" | "email" | "password"

export type EditableUser = Pick<User, EditableProps>
