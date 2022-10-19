CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    is_completed BOOLEAN,
    description text,
    todo_id bigint REFERENCES todos(id) ON DELETE CASCADE
);