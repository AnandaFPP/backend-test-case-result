const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loan");
const { protect } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Loans
 *   description: Loan management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         member_id:
 *           type: string
 *         book_id:
 *           type: string
 *         loan_date:
 *           type: string
 *           format: date-time
 * 
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         code:
 *           type: string
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         stock:
 *           type: integer
 *         available_stock:
 *           type: integer
 *     
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         penalty_until:
 *           type: string
 *           format: date-time
 *         active_loans:
 *           type: integer
 */

/**
 * @swagger
 * /loans/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 loan:
 *                   $ref: '#/components/schemas/Loan'
 *             example:
 *               message: "Book borrowed successfully"
 *               loan:
 *                 id: "5058c427-354d-4276-8fd6-3d51b162b280"
 *                 member_id: "07e686fa-76b8-4abf-9107-a7ea74f64ee7"
 *                 book_id: "257aa269-c3dc-4fad-9d6a-79e856593e7e"
 *                 loan_date: "2024-06-09T05:09:13.957Z"
 */

router.post("/borrow", protect, loanController.borrowBook)

/**
 * @swagger
 * /loans/return:
 *   post:
 *     summary: Return a book
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Book returned successfully"
 */

router.post("/return", protect, loanController.returnBook)

/**
 * @swagger
 * /loans/check-books:
 *   get:
 *     summary: Check all books available to borrow
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: A list of books available to borrow
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *             example:
 *               - id: "18946f0c-09ba-4264-8829-09b2451fbf9c"
 *                 code: "SHR-1"
 *                 title: "A Study in Scarlet"
 *                 author: "Arthur Conan Doyle"
 *                 stock: 1
 *               - id: "257aa269-c3dc-4fad-9d6a-79e856593e7e"
 *                 code: "TW-11"
 *                 title: "Twilight"
 *                 author: "Stephenie Meyer"
 *                 stock: 1
 *               - id: "9d934cd4-2a94-4181-8730-6179dd8a79d5"
 *                 code: "NRN-7"
 *                 title: "The Lion, the Witch and the Wardrobe"
 *                 author: "C.S. Lewis"
 *                 stock: 1
 *               - id: "cc18c2c9-82ce-4126-a184-63538353d879"
 *                 code: "HOB-83"
 *                 title: "The Hobbit, or There and Back Again"
 *                 author: "J.R.R. Tolkien"
 *                 stock: 1
 *               - id: "4e59bd35-5c44-4493-bedf-abda40a64e92"
 *                 code: "update"
 *                 title: "update"
 *                 author: "update"
 *                 stock: 200
 */

router.get("/check-books", loanController.checkBooks)

/**
 * @swagger
 * /loans/check-members:
 *   get:
 *     summary: Check all members
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *             example:
 *               - id: "07e686fa-76b8-4abf-9107-a7ea74f64ee7"
 *                 code: "M001"
 *                 name: "Angga"
 *                 password: "$2a$10$EDjbo9ahOATvVMr8S6pSWOJrngcIl0wX1uJexZLKI1Jvb6w8vTkOW"
 *                 penalty_until: null
 *                 active_loans: "1"
 *               - id: "0c1eb45f-df28-474b-bcff-6424e8ce6c5f"
 *                 code: "M002"
 *                 name: "Ferry"
 *                 password: "$2a$10$LnqhhENqsWx9Ku8NOTuKku459f4d6wNExnAUwqeLiE0ftPzWvmf46"
 *                 penalty_until: null
 *                 active_loans: "0"
 *               - id: "1a7f0588-9ead-4f51-b5b5-0f5709c6b1ed"
 *                 code: "M003"
 *                 name: "Putri"
 *                 password: "$2a$10$x6t7U/CNPQimrqI55wSR8.BM3tmreULvRvIzEMgkT6RD63rnJHUAu"
 *                 penalty_until: null
 *                 active_loans: "0"
 */

router.get("/check-members", loanController.checkMembers)

/**
 * @swagger
 * /loans/all:
 *   get:
 *     summary: Get all loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: A list of all loans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Loan'
 *             example:
 *               - id: "5058c427-354d-4276-8fd6-3d51b162b280"
 *                 member_id: "07e686fa-76b8-4abf-9107-a7ea74f64ee7"
 *                 book_id: "257aa269-c3dc-4fad-9d6a-79e856593e7e"
 *                 loan_date: "2024-06-09T05:09:13.957Z"
 */

router.get("/all", loanController.getAllLoans);

module.exports = router;