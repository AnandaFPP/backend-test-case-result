const { v4: uuidv4 } = require('uuid');
const { selectAllBooks, createBook, findBookById, countBooks, selectBook, updateBookStock, deleteBook, updateBookData } = require('../models/book');
const commonHelper = require('../helper/common');

const bookController = {
    getAllBooks: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const sortby = req.query.sortby || 'code';
            const sort = req.query.sort || 'ASC';

            const result = await selectAllBooks({ limit, offset, sort, sortby });
            const books = result.rows;

            const { rows: [count] } = await countBooks();
            const totalData = parseInt(count.count);
            const totalPage = Math.ceil(totalData / limit);
            const pagination = {
                currentPage: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage,
            };

            commonHelper.response(res, books, 200, 'Get Books Data Success', pagination);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    createBook: async (req, res) => {
        try {
            const { code, title, author, stock } = req.body;
            const id = uuidv4();
            const data = { id, code, title, author, stock };
            const result = await createBook(data);

            commonHelper.response(res, result.rows[0], 201, 'Book created successfully!');
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getBookByCode: async (req, res) => {
        try {
            const code = req.params.code;
            const result = await selectBook(code);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }

            commonHelper.response(res, result.rows[0], 200, 'Get Book Data Success');
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateBook: async (req, res) => {
        try {
            const bookId = req.params.id;
            const { code, title, author, stock } = req.body;

            const { rowCount } = await findBookById(bookId);
            if (!rowCount) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const data = { id: bookId, code, title, author, stock };
            const result = await updateBookData(data);

            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Book update failed' });
            }

            commonHelper.response(res, result.rows[0], 200, 'Book has been updated successfully!');
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateBookStock: async (req, res) => {
        try {
            const bookId = req.params.id;
            const { stock } = req.body;
            const result = await updateBookStock(bookId, stock);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }

            commonHelper.response(res, result.rows[0], 200, 'Update Book Stock Success');
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteBook: async (req, res) => {
        try {
            const bookId = req.params.id;
            const result = await deleteBook(bookId);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }
            commonHelper.response(res, result.rows[0], 200, 'Delete Book Success');
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = bookController;