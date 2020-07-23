import Knex from "knex"

export const up = (knex: Knex) =>
    knex.schema.createTable("tutorials", table => {
        table.increments("id")
        table.text("name")
        table.integer("base")
        table.json("requires")
        table.integer("solution")
        table.json("steps")
        table.json("hidden")
        table.foreign("base").references("id").inTable("projects")
        table.foreign("solution").references("id").inTable("projects")
    })

export const down = (knex: Knex) => knex.schema.dropTable("tutorials")
