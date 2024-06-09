CREATE TABLE members (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    code VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    penalty_until DATE
);

CREATE TABLE books (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    code VARCHAR UNIQUE NOT NULL,
    title VARCHAR NOT NULL,
    author VARCHAR(100) NOT NULL,
    stock INT DEFAULT 1
);

CREATE TABLE loans (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    member_id VARCHAR(255) NOT NULL,
    book_id VARCHAR(255) NOT NULL,
    loan_date DATE NOT NULL,
    return_date DATE DEFAULT NULL,
    is_returned BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);