CREATE TYPE userstatus AS ENUM ('None', 'Frequent', 'VIP');
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    status userstatus,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    loc VARCHAR(100)
);