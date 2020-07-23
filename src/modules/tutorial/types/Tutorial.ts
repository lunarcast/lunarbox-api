import { Project } from "../../project/types/Project"
import { User } from "../../user/types/User"

type RuntimeValue = object

export interface Tutorial {
    id: string
    name: string
    owner: User["id"]
    base: Project["id"]
    requires: string[]
    solution: Project["id"]
    steps: object
    hiddenElements: object
}

export interface TutorialRaw {
    id: string
    name: string
    owner: User["id"]
    base: Project["id"]
    requires: string
    solution: Project["id"]
    steps: object
    hidden: object
}

type TutorialWithMetadata = Tutorial & { completed: boolean }
