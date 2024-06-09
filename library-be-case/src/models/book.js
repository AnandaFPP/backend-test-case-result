const Pool = require("../config/db");

const selectAllBooks = ({ limit, offset, sort, sortby }) => {
    return Pool.query(
        `SELECT * FROM books ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
    );
};

const selectBook = (code) => {
    return Pool.query(`SELECT * FROM books WHERE code = '${code}'`);
};

const createBook = (data) => {
    const { id, code, title, author, stock } = data;
    return Pool.query(
        `INSERT INTO books(id, code, title, author, stock) VALUES('${id}', '${code}', '${title}', '${author}', ${stock})`
    );
};

const findBookById = (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM books WHERE id = '${id}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    );
};

const updateBookData = (data) => {
    const { id, code, title, author, stock } = data;
    return Pool.query(
        `UPDATE books SET code = $1, title = $2, author = $3, stock = $4 WHERE id = $5 RETURNING *`,
        [code, title, author, stock, id]
    );
};


const updateBookStock = (id, stock) => {
    return new Promise((resolve, reject) =>
        Pool.query(
            `UPDATE books SET stock = ${stock} WHERE id = '${id}' RETURNING *`,
            (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        )
    );
};

const countBooks = () => {
    return Pool.query(`SELECT COUNT(*) FROM books`);
};

const deleteBook = (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`DELETE FROM books WHERE id = '${id}' RETURNING *`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    );
};

module.exports = {
    selectAllBooks,
    createBook,
    findBookById,
    countBooks,
    selectBook,
    updateBookData,
    updateBookStock,
    deleteBook
};