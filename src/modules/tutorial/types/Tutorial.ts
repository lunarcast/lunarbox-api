import { Project } from "../../project/types/Project"

type RuntimeValue = object

export interface Tutorial {
    id: string
    name: string
    base: string
    requires: string[]
    solution: Project["id"]
    steps: object
    hiddenElements: object
}

type TutorialWithMetadata = Tutorial & { completed: boolean }
