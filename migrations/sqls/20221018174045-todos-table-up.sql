CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    isCompleted BOOLEAN,
    description text
);