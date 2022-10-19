import Client from "../database";

export type Item = {
  id?: Number;
  name: string;
  isCompleted: Boolean;
  description: string;
  todoId: Number;
};

export class ItemStore {
  // Shows todoItems for todo list by todoId
  async todoItems(todoId: string): Promise<Item[]> {
    try {
      const sql = "SELECT * FROM items WHERE todoId = ($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [todoId]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Cannot not find items that belongs to todo id ${todoId}. Error: ${err}`
      );
    }
  }

  // adds a new item
  async create(i: Item): Promise<Item> {
    try {
      const sql =
        "INSERT INTO items (name, isCompleted, description, todoId) VALUES($1, $2, $3, $4) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        i.name,
        i.isCompleted,
        i.description,
        i.todoId,
      ]);

      const todo = result.rows[0];

      conn.release();

      return todo;
    } catch (err) {
      throw new Error(`Could not add new item ${i.name}. Error: ${err}`);
    }
  }
}
