# Criação da tabela

CREATE TABLE users (
  user_id integer PRIMARY KEY DEFAULT nextval('user_id_seq'),
  name VARCHAR (50),
  user_name VARCHAR (50) UNIQUE NOT NULL,
  passw TEXT NOT NULL,
  access_token TEXT,
  ddns TEXT NOT NULL
);