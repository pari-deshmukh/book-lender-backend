CREATE TABLE genres (
  ID INT NOT NULL AUTO_INCREMENT,  
  name VARCHAR(64) UNIQUE NOT NULL,  
  description TEXT,
  PRIMARY KEY (ID)
);

INSERT INTO genres (name, description) VALUES ('comedy', 'Funny books');
INSERT INTO genres (name, description) VALUES ('fiction', 'Dreamt up stories');
INSERT INTO genres (name, description) VALUES ('non-fiction', 'True stories');
INSERT INTO genres (name, description) VALUES ('management', 'books on management practices');