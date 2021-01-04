CREATE TABLE requests (
  ID INT NOT NULL AUTO_INCREMENT,  
  dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
  dateModified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  bookID INT NOT NULL,
  authorID INT NOT NULL,
  requestStatus VARCHAR(15) NOT NULL DEFAULT 'active',
  PRIMARY KEY (ID),
  FOREIGN KEY (authorID) REFERENCES users (ID) ON DELETE CASCADE,
  FOREIGN KEY (bookID) REFERENCES books (ID) ON DELETE CASCADE
);