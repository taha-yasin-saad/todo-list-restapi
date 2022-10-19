import Client from "../database";

export type Item = {
  id?: Number;
  name: string;
  isCompleted: Boolean;
  description: string;
  todoId: Number;
};

export class ItemStore {

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
