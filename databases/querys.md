# Criação da tabela

CREATE TABLE users (
  user_id integer PRIMARY KEY DEFAULT nextval('user_id_seq'),
  name VARCHAR (50),
  user_name VARCHAR (50) UNIQUE NOT NULL,
  passw TEXT NOT NULL,
  access_token TEXT,
  ddns TEXT NOT NULL
);

SELECT * FROM users;

CREATE SEQUENCE user_id_seq START 1;

ALTER SEQUENCE user_id_seq RESTART;

INSERT INTO users (name, user_name, passw, access_token, ddns) VALUES ('Jhonatan Rios', 'jhonatan98rios', 'BatataDoce', 'abcd1234', '192.168.10.250');