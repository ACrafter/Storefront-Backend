CREATE TYPE orderstatus AS ENUM ('Active', 'Completed');
CREATE TABLE orders(
    id SERIAL PRIMARY KEY NOT NULL,
    userid INT REFERENCES users(id) NOT NULL,
    ETA VARCHAR(50) NOT NULL,
    weight INT NOT NULL,
    status VARCHAR(50) NOT NULL
);