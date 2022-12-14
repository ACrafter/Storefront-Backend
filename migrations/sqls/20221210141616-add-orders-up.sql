CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES users(id) NOT NULL,
    weight INT NOT NULL,
    status VARCHAR(50),
    ETA VARCHAR(50)
);