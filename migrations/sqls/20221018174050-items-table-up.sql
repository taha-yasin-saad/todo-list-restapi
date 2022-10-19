CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    isCompleted BOOLEAN,
    description text,
    todoId bigint REFERENCES todos(id) ON DELETE CASCADE
);