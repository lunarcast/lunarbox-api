type RuntimeValue = object

interface TutorialTest {
    inputs: RuntimeValue[]
    output: RuntimeValue
}

interface Tutorial {
    id: string
    name: string
    base: string
    requires: string[]
    steps: object
    hiddenElements: object
    tests: TutorialTest[]
}

type TutorialWithMetadata = Tutorial & { completed: boolean }
