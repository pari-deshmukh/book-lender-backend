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

INSERT INTO books (title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID) VALUES ('book1', 'author1', '1-234-567-890', 'available', 'placeholder book summary', 'https://picsum.photos/id/1044/400', 'https://picsum.photos/id/1045/400',1);
INSERT INTO books (title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID) VALUES ('book2', 'author2', '2-234-567-890', 'on loan', 'placeholder book summary', 'https://picsum.photos/id/2044/400', 'https://picsum.photos/id/2045/400',2);
INSERT INTO books (title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID) VALUES ('book3', 'author3', '3-234-567-890', 'requested', 'placeholder book summary', 'https://picsum.photos/id/3044/400', 'https://picsum.photos/id/3045/400',1);
INSERT INTO books (title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID) VALUES ('book4', 'author4', '4-234-567-890', 'on loan', 'placeholder book summary', 'https://picsum.photos/id/4044/400', 'https://picsum.photos/id/4045/400',2);
INSERT INTO books (title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID) VALUES ('book5', 'author5', '5-234-567-890', 'requested', 'placeholder book summary', 'https://picsum.photos/id/5044/400', 'https://picsum.photos/id/5045/400',2);
INSERT INTO books (title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID) VALUES ('book6', 'author6', '6-234-567-890', 'available', 'placeholder book summary', 'https://picsum.photos/id/6044/400', 'https://picsum.photos/id/6045/400',1);
INSERT INTO books (title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID) VALUES ('book7', 'author7', '7-234-567-890', 'on loan', 'placeholder book summary', 'https://picsum.photos/id/7044/400', 'https://picsum.photos/id/7045/400',1);
INSERT INTO books (title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID) VALUES ('book8', 'author8', '8-234-567-890', 'requested', 'placeholder book summary', 'https://picsum.photos/id/8044/400', 'https://picsum.photos/id/8045/400',2);
INSERT INTO books (title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID) VALUES ('book9', 'author9', '9-234-567-890', 'available', 'placeholder book summary', 'https://picsum.photos/id/9044/400', 'https://picsum.photos/id/9045/400',2);
INSERT INTO books (title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID) VALUES ('book0', 'author0', '0-234-567-890', 'available', 'placeholder book summary', 'https://picsum.photos/id/1054/400', 'https://picsum.photos/id/1055/400', 1);