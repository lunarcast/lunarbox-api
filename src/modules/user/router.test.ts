import request from "supertest"
import superagent from "superagent"

import { expect } from "chai"

import { db } from "../../../db/knex"

import { server } from "../../"

import users from "../../../db/seeds/examples/users"
import { User } from "./types/User"

const agent = request.agent(server)

const newUser = {
    username: "SomeGuy",
    email: "example@gmail.com",
    password: "WhatShouldITypeHere88"
}

describe("users router", () => {
    before(async () => {
        await db.migrate.latest()
        await db.seed.run()
    })

    it("Creates an user", async () => {
        const response = await agent
            .post(`/api/users/`)
            .send(newUser)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)

        expect(response.body).to.deep.equal({
            status: 201,
            message: "Successfully created"
        })
    })

    it("Fails to create an user with the same username", async () => {
        const response = await request(server)
            .post(`/api/users/`)
            .send(newUser)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)

        expect(response.body).to.deep.equal({
            status: 400,
            message: "That Username seems to be already taken"
        })
    })

    it("Fetches the newly-created user", async () => {
        const response = await agent
            .get(`/api/users/`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)

        const { email, username } = newUser

        expect(response.body).to.deep.equal({
            user: {
                email,
                username,
                isAdmin: false
            }
        })
    })

    it("Deletes the newly-created user", async () => {
        const response = await agent
            .delete("/api/users")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)

        expect(response.body).to.deep.equal({
            status: 200,
            message: "Successfully deleted user account"
        })
    })
})
