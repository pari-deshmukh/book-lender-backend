CREATE TABLE bookGenres (
  bookID INT NOT NULL,
  genreID INT NOT NULL,
  FOREIGN KEY (bookID) REFERENCES books (ID) ON DELETE CASCADE,
  FOREIGN KEY (genreID) REFERENCES genres (ID) ON DELETE CASCADE,
  PRIMARY KEY (bookID, genreID)
);

INSERT INTO bookGenres (bookID, genreID) VALUES (2, 1);
INSERT INTO bookGenres (bookID, genreID) VALUES (2, 2);
INSERT INTO bookGenres (bookID, genreID) VALUES (5, 1);
INSERT INTO bookGenres (bookID, genreID) VALUES (4, 2);
INSERT INTO bookGenres (bookID, genreID) VALUES (7, 1);
INSERT INTO bookGenres (bookID, genreID) VALUES (9, 2);
INSERT INTO bookGenres (bookID, genreID) VALUES (3, 1);
INSERT INTO bookGenres (bookID, genreID) VALUES (6, 3);