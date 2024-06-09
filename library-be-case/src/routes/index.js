const express = require("express");
const router = express.Router();
const membersRouter = require('../routes/member')
const booksRouter = require('../routes/book')
const loansRouter = require('../routes/loan')

router.use('/members', membersRouter);
router.use('/books', booksRouter);
router.use('/loans', loansRouter);

module.exports = router;

