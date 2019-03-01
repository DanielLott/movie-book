DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

DROP DATABASE IF EXISTS moviebook_db
CREATE DATABASE moviebook_db;
USE moviebook_db;

CREATE TABLE users (
    id integer(10) not null auto_increment,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email varchar(100) not null,
    password varchar(40),
    join_date datetime,
    primary key (id)
);

CREATE TABLE movies (
    id integer(10) not null auto_increment,
    movie_title varchar(255) not null,
    genre varchar(100) not null,
    seen BOOLEAN DEFAULT FALSE,
    primary key(id)
);

CREATE TABLE reviews (
  id integer(10) not null auto_increment,
  review varchar


)

