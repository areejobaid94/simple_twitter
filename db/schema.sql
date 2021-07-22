CREATE DATABASE simpletwitterdb;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  user_id integer not null references users(id)
);

CREATE TABLE tags(
  id SERIAL PRIMARY KEY,
  tag_value TEXT NOT NULL UNIQUE
);

CREATE TABLE tags_posts(
  id SERIAL PRIMARY KEY,
  post_id integer not null references posts(id),
  tag_id integer not null references tags(id),
  posting_date DATE NOT NULL DEFAULT CURRENT_DATE
);


CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  user_id integer not null references users(id),
  post_id integer not null references posts(id)
);


CREATE TABLE followers(
  follower_id integer references users(id),
  user_id integer references users(id),
  PRIMARY KEY(follower_id, user_id)
);

CREATE TABLE likes(
  id SERIAL PRIMARY KEY,
  post_id integer not null references posts(id),
  user_id integer not null references users(id),
  value text NOT NULL
);

-- start psql => psql
-- open simpletwitterdb db => \c simpletwitterdb
--\dt
--heroku pg:psql