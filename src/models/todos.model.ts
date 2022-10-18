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

  // Deletes todo list by id
  async delete(id: string): Promise<Todo> {
    try {
      const sql = "DELETE FROM todos WHERE id = $1 RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      const todo = result.rows[0];

      conn.release();

      return todo;
    } catch (err) {
      throw new Error(`Could not delete todo ${id}. Error: ${err}`);
    }
  }

  // Update isCompleted of a Todo List by id
  async isCompleted(t: Todo): Promise<Todo> {
    try {
      const conn = await Client.connect();
      const sql = "UPDATE todos SET isCompleted = $1 WHERE id = $2 RETURNING *";

      const result = await conn.query(sql, [t.isCompleted, t.id]);

      const todo = result.rows[0];

      conn.release();

      return todo;
    } catch (err) {
      throw new Error(
        `Could not assign the todo list isCompleted to ${t.isCompleted}. Error: ${err}`
      );
    }
  }
}
