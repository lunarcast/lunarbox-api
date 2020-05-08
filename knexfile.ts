import type { Config } from "knex"
import { config } from "dotenv"

config()

const options = {
    client: process.env.DB_CLIENT,
    connection: process.env.CONNECTION || {
        filename: "db/db.sqlite3"
    },
    migrations: {
        directory: "db/migrations",
        tableName: "migrations"
    },
    debug: process.env.NODE_ENV === "development",
    seeds: {
        directory: "db/seeds"
    },
    pool: { min: 2, max: 10 }
}

const configs: Record<string, Config<{}> & { ssl?: boolean }> = {
    development: options,

    test: {
        ...options,
        connection: process.env.TEST_CONNECTION
    },

    production: {
        ...options,
        connection: process.env.DATABASE_URL,
        ssl: true
    }
}

const { development, test, production } = configs

export { development, test, production }
