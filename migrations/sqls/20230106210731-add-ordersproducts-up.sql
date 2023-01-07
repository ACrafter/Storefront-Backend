CREATE TABLE ordersproducts(
    id SERIAL PRIMARY KEY NOT NULL,
    productsid INT REFERENCES products(id),
    ordersid INT REFERENCES orders(id)
);