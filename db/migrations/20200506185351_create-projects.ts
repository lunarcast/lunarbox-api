import Knex from "knex"

export const up = (knex: Knex) =>
    knex.schema.createTable("projects", table => {
        table.increments("id")
        table.integer("owner")
        table.boolean("example")
        table.text("name")
        table.text("description")
        table.json("project")
        table.json("metadata")
        table.foreign("owner").references("id").inTable("users")
    })

export const down = (knex: Knex) => knex.schema.dropTable("projects")
