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
      const sql = "SELECT * FROM items WHERE todo_id = ($1)";
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
        "INSERT INTO items (name, is_completed, description, todo_id) VALUES($1, $2, $3, $4) RETURNING *";
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

  // Update Todo List's Item by id
  async update(i: Item): Promise<Item> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE items SET name = $1, is_completed = $2, description = $3, todo_id = $4 WHERE id = $5 RETURNING *";

      const result = await conn.query(sql, [
        i.name,
        i.isCompleted,
        i.description,
        i.todoId,
        i.id,
      ]);

      const todo = result.rows[0];

      conn.release();

      return todo;
    } catch (err) {
      throw new Error(
        `Could not update the todo list's item ${i.name}. Error: ${err}`
      );
    }
  }

  // Update isCompleted of a Todo List by id
  async isCompleted(i: Item): Promise<Item> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE items SET is_completed = $1 WHERE id = $2 RETURNING *";

      const result = await conn.query(sql, [i.isCompleted, i.id]);

      const todo = result.rows[0];

      conn.release();

      return todo;
    } catch (err) {
      throw new Error(
        `Could not assign the todo list's item isCompleted to ${i.isCompleted}. Error: ${err}`
      );
    }
  }

  // check isCompleted of a items by id
  async checkIsCompleted(id: string) {
    try {
      const conn = await Client.connect();

      const sqlTodoId = "SELECT todo_id as todoidval FROM items WHERE id = $1";

      const resultTodoId = await conn.query(sqlTodoId, [id]);

      const todoId = resultTodoId.rows[0].todoidval;

      const sql =
        "SELECT COUNT(id) FROM items WHERE todo_id = $1 AND is_completed = false";

      const result = await conn.query(sql, [todoId]);

      let itemsIsNotCompleted = result.rows[0];

      itemsIsNotCompleted.todoId = todoId;

      conn.release();

      return itemsIsNotCompleted;
    } catch (err) {
      throw new Error(`Could find todo list's item isCompleted. Error: ${err}`);
    }
  }

  // Update isCompleted Todolist
  async todoIsCompleted(todoId: string): Promise<Item> {
    try {
      const sql =
        "UPDATE todos SET is_completed = true WHERE id = $1 RETURNING *";
      
      const conn = await Client.connect();
      const result = await conn.query(sql, [todoId]);

      const todo = result.rows[0];

      conn.release();

      return todo;
    } catch (err) {
      throw new Error(
        `Could not set item's todo to completed ${todoId}. Error: ${err}`
      );
    }
  }

  // deletes an item by id
  async delete(id: string): Promise<Item> {
    try {
      const sql = "DELETE FROM items WHERE id = ($1)  RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      const item = result.rows[0];

      conn.release();

      return item;
    } catch (err) {
      throw new Error(`Could not delete item ${id}. Error: ${err}`);
    }
  }
}
