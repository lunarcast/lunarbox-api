import Knex from "knex"

export const up = (knex: Knex) =>
    knex.schema.createTable("users", table => {
        table.increments("id")
        table.text("username").notNullable().unique()
        table.text("email").notNullable().unique()
        table.text("password").notNullable()
        table.boolean("admin").defaultTo("false")
    })

export const down = (knex: Knex) => knex.schema.dropTable("users")
