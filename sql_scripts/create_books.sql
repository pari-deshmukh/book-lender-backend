CREATE TABLE books (
      ID INT NOT NULL AUTO_INCREMENT,  
      title VARCHAR(32) NOT NULL,  
      author VARCHAR(100) NOT NULL,  
      isbn VARCHAR(20) NOT NULL,
      availabilityStatus VARCHAR(15) NOT NULL DEFAULT 'available',
      summary TEXT,
      dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      dateModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      frontCoverImageURL VARCHAR(2048),  
      rearCoverImageURL VARCHAR(2048),  
      ownerID INT NOT NULL,
      PRIMARY KEY (ID),
      FOREIGN KEY (ownerID) REFERENCES users (ID) ON DELETE CASCADE
);
