import Knex from "knex"

export const up = (knex: Knex) =>
    knex.schema.createTable("completed-tutorials", table => {
        table.increments("id")
        table.integer("tutorial")
        table.integer("user")
        table.foreign("tutorial").references("id").inTable("tutorials")
        table.foreign("user").references("id").inTable("users")
    })

export const down = (knex: Knex) => knex.schema.dropTable("completed-tutorials")
