CREATE TABLE ordersProducts(
    id SERIAL PRIMARY KEY,
    orderId INT REFERENCES orders(id) NOT NULL,
    productId INT REFERENCES products(id) NOT NULL,
    quantity INT NOT NULL
);