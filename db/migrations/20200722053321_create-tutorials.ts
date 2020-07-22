import Knex from "knex"

export const up = (knex: Knex) =>
    knex.schema.createTable("tutorials", table => {
        table.increments("id")
        table.text("name")
        table.text("base")
        table.json("requires")
        table.text("solution")
        table.json("steps")
        table.json("hidden")
    })

export const down = (knex: Knex) => knex.schema.dropTable("tutorials")
