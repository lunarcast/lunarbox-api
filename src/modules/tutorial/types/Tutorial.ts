import { Project } from "../../project/types/Project"
import { User } from "../../user/types/User"

export interface Tutorial {
    id: string
    name: string
    owner: User["id"]
    base: Project["id"]
    solution: Project["id"]
    content:string
    hiddenElements: object[]
}

export interface TutorialRaw {
    id: string
    name: string
    owner: User["id"]
    base: Project["id"]
    solution: Project["id"]
    hidden: object[]
    content:string
}
