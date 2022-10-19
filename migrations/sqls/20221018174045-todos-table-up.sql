CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    is_completed BOOLEAN,
    description text
);