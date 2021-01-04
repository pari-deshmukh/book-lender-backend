CREATE TABLE roles (
  name VARCHAR(16) UNIQUE NOT NULL,
  description TEXT,
  PRIMARY KEY (name)
);

INSERT INTO roles (name, description) VALUES ('user', 'General registered user to the site without any administrative access');
INSERT INTO roles (name, description) VALUES ('admin', 'Admin user with full administrative access to the site');