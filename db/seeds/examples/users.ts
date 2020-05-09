import { User as UserType } from "../../../src/modules/user/types/User"

type User = Omit<UserType, "id" | "admin">

export default [
    {
        username: "BlueGhost",
        email: "blueghost@lunarbox.com",
        password: "IhaveAstrongPassword14"
    },
    {
        username: "ThatOneDude",
        email: "thelegend27@lunarsphere.com",
        password: "weakpass"
    }
] as readonly User[]
