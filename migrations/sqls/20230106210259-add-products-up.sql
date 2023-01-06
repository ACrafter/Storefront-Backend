CREATE TABLE products(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    brand VARCHAR(100) NOT NULL,
    quantity INT,
    description TEXT,
    image TEXT NOT NULL
);