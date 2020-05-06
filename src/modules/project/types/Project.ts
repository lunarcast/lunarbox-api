import { User } from "../../user/types/User"

export interface Project {
    id: number
    owner: User["id"]
    example: boolean
    name: string
    description: string
    project: object
}
