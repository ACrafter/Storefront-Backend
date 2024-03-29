# Storefront-Backend

A Fully Functional Express RESTful API meant to support a ECommerce website. Complete with Authentication & Authorization using **Bycrypt** and **JWT**, Migrations using **db-migrate** and **pg** to interface with a postgres database, and finally strict-typing & unit testing using **Typescript** and **Jasmine**.

---

## Installation & Recreating the env

- Installing dependances <br />
    `npm i`

- Creating the DB <br>
    `CREATE DATABASE market` <br>
    `CREATE DATABASE markettest`

- The user used is Postgres.

---

## Scripts

- Running tests <br />
 `npm run test`

- Booting up the server <br />
`npm run server`

- Running Eslint & Prettier <br />
`npm run lint`

---

## Endpoints

- Visit *localhost:3000* a quick brief of all the API Endpoints is there

---

The API supports three main tables Users, Orders, Products. Where a 1:N relation exists between the Users & Orders tables and a N:M relation exists between the Orders & Products tables. Some RESTful Routes require the JWT token to be accessed. The project was constructed using the TDD approach. 

---

## ENV Variables

- ENV="dev"
- HOST="database-1.co4akogllbuk.us-east-1.rds.amazonaws.com"
- HOSTEST="database-2.co4akogllbuk.us-east-1.rds.amazonaws.com"
- DB = "market"
- TESTDB = "markettest"
- USER = "postgres"
- PASS = "12345"
- SECRET = "I-will-show-you-the-world"
- SALT_ROUNDS = 10
- TOKEN = 'shinning-shimmring-splended'

---

## Project Ports/Links

- Server URL: http://storebackend-env.eba-9cttnj2w.us-east-1.elasticbeanstalk.com
- Site URL: http://my-store-frontend.s3-website-us-east-1.amazonaws.com/
- PSQL Port: 5432

---

## CircleCI Variables

- AWS_ACCESS_KEY: AKIAWCNUZXZ7ABBVXIHJ
- AWS_ACCESS_KEY_ID: AKIAWCNUZXZ7ABBVXIHJ
- AWS_DEFAULT_REGION:us-east-1

---

*This project was made as a part of EgyFwd Advanced Web Track Training*
