# Storefront Backend Project

### Getting Started

This repo contains a TODO Backend Project constructing an API. To get started.

## Setup and Connect to the database

- clone this repo
- run `docker compose up`
- switch to the postgres user `su postgres`
- start psql `psql postgres`
- in psql run the following:
- `CREATE USER {dbUserName} WITH PASSWORD '{password}';`
- `CREATE DATABASE {dbName};`
- `\c {dbName}`
- `GRANT ALL PRIVILEGES ON DATABASE {dbName} TO {dbUserName};`
- to test that it is working run \dt and it should output "No relations found."

## Package installation instructions

- install yarn `npm install yarn -g`
- install db-migrate on the machine for terminal commands `npm install db-migrate -g`
- install all project dependencies yarn to run the migrations `yarn install --ignore-engines`
- run `db-migrate up` to migrate and update the database
- run `yarn watch` in your terminal at the project root to show the app starting on port `3000`.

## environment variables

- `PR_DB_HOST=127.0.0.1`
- `PR_DEV_DB={dbName}`
- `PR_TEST_DB={dbTestName}`
- `PR_DB_USER={dbUserName}`
- `PR_DB_PASSWORD={password}`
- `ENV={ENV : 'dev' - 'test'}`

## API Endpoints

#### Todo List End Points

- CREATE TODO : POST `localhost:3000/todo`
- UPDATE TODO [args: todo id] : PUT `localhost:3000/todo/:id`
- DELETE TODO [args: todo id] : DELETE `localhost:3000/todo/:id`
- Mark Todo as completed [args: todo id] : POST `localhost:3000/todo/:id`

#### Todo List Items End Points

- List Todo's Items [args: todo id] : GET `localhost:3000/todoItem/:id`
- DELETE Todo's Item [args: todo id, item id] : DELETE `localhost:3000/todoItem/:id/:item_id`
- Add Todo's Item [args: todo id] : POST `localhost:3000/todoItem/:id`
- Mark Todo's Item as completed [args: todo id, item id] : POST `localhost:3000/todoItem/:id/:item_id`
- Update Todo's Item [args: todo id, item id] : PUT `localhost:3000/todoItem/:id/:item_id`

## Data Shapes

#### Todo

- id
- title
- isComplete
- description
- itemId

#### items

- id
- name
- isCompeleted
- description
