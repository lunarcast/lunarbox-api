import { Project } from "../../project/types/Project"

type RuntimeValue = object

export interface Tutorial {
    id: string
    name: string
    base: Project["id"]
    requires: string[]
    solution: Project["id"]
    steps: object
    hiddenElements: object
}

export interface TutorialRaw {
    id: string
    name: string
    base: Project["id"]
    requires: string
    solution: Project["id"]
    steps: object
    hidden: object
}

type TutorialWithMetadata = Tutorial & { completed: boolean }
