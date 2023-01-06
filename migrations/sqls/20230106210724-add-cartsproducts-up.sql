CREATE TABLE cartsproducts(
    id SERIAL PRIMARY KEY NOT NULL,
    productsid INT REFERENCES products(id) NOT NULL,
    cartsid INT REFERENCES carts(id) NOT NULL
);