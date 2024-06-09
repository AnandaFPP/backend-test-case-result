const Pool = require("../config/db");

const createLoan = (data) => {
    const { id, member_id, book_id, loan_date } = data;
    return Pool.query(
        `INSERT INTO loans(id, member_id, book_id, loan_date) VALUES('${id}', '${member_id}', '${book_id}', '${loan_date}')`
    );
};

const updateLoan = (data) => {
    const { id, return_date, is_returned } = data;
    return Pool.query(
        `UPDATE loans SET return_date='${return_date}', is_returned=${is_returned} WHERE id='${id}'`
    );
};

const findLoan = (member_id, book_id) => {
    return Pool.query(
        `SELECT * FROM loans WHERE member_id='${member_id}' AND book_id='${book_id}' AND is_returned=false`
    );
};

const countActiveLoans = (member_id) => {
    return Pool.query(
        `SELECT COUNT(*) FROM loans WHERE member_id='${member_id}' AND is_returned=false`
    );
};

const findActiveLoanByBook = (book_id) => {
    return Pool.query(
        `SELECT * FROM loans WHERE book_id='${book_id}' AND is_returned=false`
    );
};

const getAllBooks = () => {
    return Pool.query(
        `SELECT books.*, 
            (books.stock - COALESCE(loans.active_count, 0)) AS available_stock
         FROM books 
         LEFT JOIN (
            SELECT book_id, COUNT(*) AS active_count 
            FROM loans 
            WHERE is_returned=false 
            GROUP BY book_id
         ) loans ON books.id = loans.book_id`
    );
};

const getAllAvailableBooks = () => {
    return Pool.query(`
        SELECT 
            books.id, 
            books.code, 
            books.title, 
            books.author, 
            books.stock 
        FROM books
        WHERE books.stock > 0 
          AND books.id NOT IN (
              SELECT book_id 
              FROM loans 
              WHERE is_returned = false
          )
    `);
};

const getAllMembers = () => {
    return Pool.query(
        `SELECT members.*, 
            COALESCE(active_loans.active_count, 0) AS active_loans 
         FROM members 
         LEFT JOIN (
            SELECT member_id, COUNT(*) AS active_count 
            FROM loans 
            WHERE is_returned=false 
            GROUP BY member_id
         ) active_loans ON members.id = active_loans.member_id`
    );
};

const getAllLoansWithDetails = () => {
    return Pool.query(`
        SELECT
            loans.id,
            members.name AS member_name,
            books.code AS book_code,
            books.title AS book_title,
            loans.loan_date,
            loans.return_date,
            loans.is_returned
        FROM loans
        JOIN members ON loans.member_id = members.id
        JOIN books ON loans.book_id = books.id
    `);
};


module.exports = {
    createLoan,
    updateLoan,
    findLoan,
    countActiveLoans,
    findActiveLoanByBook,
    getAllBooks,
    getAllAvailableBooks,
    getAllMembers,
    getAllLoansWithDetails
};