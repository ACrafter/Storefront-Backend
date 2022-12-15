# API Endpoints

## Users

- **GET** to */users* returns all users, token required. (the token is passed as a body prop with the key token,)
- **POST** to */users* with the **username**, **firstname**, **password** and **status**, creates a user and returns a JWT token.
- **GET** to */users/:id* returns that user, token required.  
- **PATCH** to */users/:id* update that user you pass the modified propery as *prop* the new value as *value* and the id as *id*, token required. 
- **DELETE** to */users/:id* deletes that user.
- **GET** to */users/login* returns a token if passed an existing username (as a body prop with key *uName*) and password (with key *pass*). 

<hr>

## Orders

- **GET** to */orders* returns all orders, token required. (the token is passed as a body prop with the key token,)
- **POST** to */orders* with the **userId**, **weight** and **status**, creates an order.
- **GET** to */orders/:id* returns that order.  
- **PATCH** to */orders/:id* update that order you pass the modified propery as *prop* the new value as *value* and the id as *id*.
- **DELETE** to */orders/:id* deletes that order.
- **GET** to */orders/users/:id* returns the orders made by that user.

<hr>

## Products

- **GET** to */products* returns all products, token required. (the token is passed as a body prop with the key token,)
- **POST** to */products* with the **name**, **type** and **quantity**, creates a product.
- **GET** to */products/:id* returns that product.  
- **PATCH** to */products/:id* update that product you pass the modified propery as *prop* the new value as *value* and the id as *id*.
- **DELETE** to */products/:id* deletes that order.