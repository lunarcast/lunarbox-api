import request from "supertest"
import superagent from "superagent"

import { expect } from "chai"

import { db } from "../../../db/knex"

import { server } from "../../"

import users from "../../../db/seeds/examples/users"
import { User } from "../user/types/User"

const agent = request.agent(server)

describe("auth router", () => {
    before(async () => {
        await db.migrate.latest()
        await db.seed.run()
    })

    it("Logs-in an user", async () => {
        const { email, username, password } = users[0]

        const response = await agent
            .post(`/api/auth/login`)
            .send({ email, password })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)

        expect(response.body).to.deep.equal({
            status: 200,
            message: "Successfully log in",
            user: { username, isAdmin: false }
        })
    })

    // it("Fails to create an user with the same username", async () => {
    //     const response = await request(server)
    //         .post(`/api/users/`)
    //         .send(newUser)
    //         .set("Accept", "application/json")
    //         .expect("Content-Type", /json/)
    //         .expect(400)

    //     expect(response.body).to.deep.equal({
    //         status: 400,
    //         message: "That Username seems to be already taken"
    //     })
    // })

    // it("Fetches the newly-created user", async () => {
    //     const response = await agent
    //         .get(`/api/users/`)
    //         .set("Accept", "application/json")
    //         .expect("Content-Type", /json/)
    //         .expect(200)

    //     const { email, username } = newUser

    //     expect(response.body).to.deep.equal({
    //         user: {
    //             email,
    //             username,
    //             isAdmin: false
    //         }
    //     })
    // })

    // it("Deletes the newly-created user", async () => {
    //     const response = await agent
    //         .delete("/api/users")
    //         .set("Accept", "application/json")
    //         .expect("Content-Type", /json/)
    //         .expect(200)

    //     expect(response.body).to.deep.equal({
    //         status: 200,
    //         message: "Successfully deleted user account"
    //     })
    // })
})
