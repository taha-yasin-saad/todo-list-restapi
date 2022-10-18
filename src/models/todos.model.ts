import Client from "../database";

export type Todo = {
  id?: Number;
  title: string;
  isCompleted: Boolean;
  description: string;
};

export class TodoStore {
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
}
