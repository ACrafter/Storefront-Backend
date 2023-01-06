CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    password VARCHAR(100) NOT NULL
);