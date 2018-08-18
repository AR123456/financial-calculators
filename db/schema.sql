
DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
(
	id int NOT NULL
	AUTO_INCREMENT,
	name varchar
	(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY
	(id)
);
