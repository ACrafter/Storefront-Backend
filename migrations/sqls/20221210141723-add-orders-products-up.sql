CREATE TABLE cartproducts(
    id SERIAL PRIMARY KEY,
    cartId INT REFERENCES carts(id) NOT NULL,
    productId INT REFERENCES products(id) NOT NULL,
    quantity INT NOT NULL
);