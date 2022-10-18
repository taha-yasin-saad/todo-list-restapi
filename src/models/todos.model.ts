import Client from "../database";

export type Todo = {
  id?: Number;
  title: string;
  isCompleted: Boolean;
  description: string;
};

export class TodoStore {

  // creates a new todo list
  async create(t: Todo): Promise<Todo> {
    try {
      const sql =
        "INSERT INTO todos (title, isCompleted, description) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        t.title,
        t.isCompleted,
        t.description,
      ]);

      const todo = result.rows[0];

      conn.release();

      return todo;
    } catch (err) {
      throw new Error(`Could not add new todo ${t.title}. Error: ${err}`);
    }
  }

  // Updates todo list by id
  async update(t: Todo): Promise<Todo> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE todos SET title = $1, isCompleted = $2, description = $3 WHERE id = $4 RETURNING *";

      const result = await conn.query(sql, [
        t.title,
        t.isCompleted,
        t.description,
        t.id,
      ]);

      const todo = result.rows[0];

      conn.release();

      return todo;
    } catch (err) {
      throw new Error(
        `Could not update the todo list ${t.title}. Error: ${err}`
      );
    }
  }
}
