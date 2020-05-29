import Knex from "knex"

export const up = (knex: Knex) =>
    knex.schema.table("projects", table => {
        table.boolean("visible").defaultTo(false)
    })

export const down = (knex: Knex) =>
    knex.schema.table("projects", table => {
        table.dropColumn("visible")
    })
