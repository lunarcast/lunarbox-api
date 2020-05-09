# Contributing

[Fork this repo](https://github.com/BlueGhostGH/lunarbox-api/fork/), write some code and submit a pull request into the develop branch.

## Installing locally

This guide assumes you have Node, yarn and PostgreSQL already installed.

This guide also assumes you know how to create a database with Postgres!

### Installing dependencies

Clone the repo. Install dependencies with:

```bash
yarn
```

> Note: this project uses yarn, pull requests using npm or pnpm will be ignored

Then you need to run the knex migrations with:

```bash
knex migrate:latest
```

### Running the development server

To start the development server, simply run:

```bash
yarn dev
```

### Building for production

To generate a production build, run:

```bash
yarn build
```
