CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    cartproductsId INT REFERENCES cartproducts(id) NOT NULL,
    weight INT NOT NULL,
    status VARCHAR(50),
    ETA VARCHAR(50)
);