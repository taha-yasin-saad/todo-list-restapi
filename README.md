# TODO Backend Project

### Getting Started

This repo contains a TODO Backend Project constructing an API. To get started.

## Setup and Connect to the database

- clone this repo
- run `docker compose up`
- run `docker exec -it todo-list-restapi-db-1 /bin/sh`
- switch to the postgres user `su postgres`
- start psql `psql postgres`
- in psql run the following:
- `CREATE USER {dbUserName} WITH PASSWORD '{password}';`
- `CREATE DATABASE {dbName};`
- `GRANT ALL ON SCHEMA public TO {dbUserName};`
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

- `PR_DB_HOST=localhost`
- `PR_DEV_DB={dbName}`
- `PR_DB_USER={dbUserName}`
- `PR_DB_PASSWORD={password}`
- `ENV=dev`

## Notes

- You can find a Postman TodoList Endpoints collection at the folder res

## API Endpoints

#### Todo List End Points

- CREATE TODO [JSON args: title, isCompleted, description] : POST `localhost:3000/todo`
- UPDATE TODO [params: todo id] [JSON args: title, isCompleted, description] : PUT `localhost:3000/todo/:id`
- DELETE TODO [params: todo id] : DELETE `localhost:3000/todo/:id`
- Mark Todo as completed [params: todo id] [JSON args: isCompleted] : POST `localhost:3000/todoIsCompleted/:id`

#### Todo List Items End Points

- List Todo's Items [params: todo id] : GET `localhost:3000/todoItem/:id`
- DELETE Todo's Item [params: item id] : DELETE `localhost:3000/todoItem/:id`
- Add Todo's Item [JSON args: name, isCompleted, description, todoId] : POST `localhost:3000/todoItem`
- Mark Todo's Item as completed [params: item id] [JSON args: isCompleted] : POST `localhost:3000/todoItemIsCompleted/:id`
- Update Todo's Item [params: item id] [JSON args: name, isCompleted, description, todoId] : PUT `localhost:3000/todoItem/:id`

## Data Shapes

#### Todo

- id
- title
- is_completed
- description

#### items

- id
- name
- is_compeleted
- description
- todo_id
