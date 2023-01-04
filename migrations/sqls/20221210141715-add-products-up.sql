CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price INT,
    quantity INT,
    description TEXT,
    productPic BYTEA
);