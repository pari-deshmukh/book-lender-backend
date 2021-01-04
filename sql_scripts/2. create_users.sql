CREATE TABLE users (
      ID INT NOT NULL AUTO_INCREMENT,  
      role VARCHAR(16) NOT NULL DEFAULT 'user',
      firstName VARCHAR(32),  
      lastName VARCHAR(32),
      username VARCHAR(16) UNIQUE NOT NULL,
      about TEXT,
      postalAddress TEXT,
      dateRegistered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      password VARCHAR(128) NOT NULL,  
      passwordSalt VARCHAR(16),  
      email VARCHAR(64) UNIQUE NOT NULL,
      avatarURL VARCHAR(64),
      modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (ID),
      FOREIGN KEY (role) REFERENCES roles (name)
);

INSERT INTO users (role, firstName, lastName, username, postalAddress, password, email) VALUES ('user', 'John', 'Doe', 'johndoe', 'some random address', '$2b$10$L/QFcmfoita0fNzT/n0HveFWcafJ0UyK4TIz1QsjMsjP6o/6RgJUS', 'john@doe.com');
INSERT INTO users (role, firstName, lastName, username, postalAddress, password, email) VALUES ('admin', 'Jane', 'Doe', 'janedoe', 'some random address', '$2b$10$TagUE/qze9AzmVsYbBVmPeG8KyCjGcMSVT3YWMgNQBebzhKOKMNOG', 'jane@doe.com');