const express = require("express");
const router = express.Router();
const booksController = require("../controllers/book");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
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
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 message:
 *                   type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalData:
 *                       type: integer
 *                     totalPage:
 *                       type: integer
 *             example:
 *               status: success
 *               statusCode: 200
 *               data:
 *                 - id: "cc18c2c9-82ce-4126-a184-63538353d879"
 *                   code: "HOB-83"
 *                   title: "The Hobbit, or There and Back Again"
 *                   author: "J.R.R. Tolkien"
 *                   stock: 1
 *                 - id: "f1b707ce-d901-4d28-b9bf-f5361e05f5b6"
 *                   code: "JK-45"
 *                   title: "Harry Potter"
 *                   author: "J.K Rowling"
 *                   stock: 1
 *                 - id: "9d934cd4-2a94-4181-8730-6179dd8a79d5"
 *                   code: "NRN-7"
 *                   title: "The Lion, the Witch and the Wardrobe"
 *                   author: "C.S. Lewis"
 *                   stock: 1
 *                 - id: "18946f0c-09ba-4264-8829-09b2451fbf9c"
 *                   code: "SHR-1"
 *                   title: "A Study in Scarlet"
 *                   author: "Arthur Conan Doyle"
 *                   stock: 1
 *                 - id: "257aa269-c3dc-4fad-9d6a-79e856593e7e"
 *                   code: "TW-11"
 *                   title: "Twilight"
 *                   author: "Stephenie Meyer"
 *                   stock: 1
 *               message: "Get Books Data Success"
 *               pagination:
 *                 currentPage: 1
 *                 limit: 10
 *                 totalData: 6
 *                 totalPage: 1
 */

router.get("/", booksController.getAllBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 pagination:
 *                   type: object
 *             example:
 *               status: success
 *               statusCode: 201
 *               message: "Book created successfully!"
 *               pagination: {}
 */

router.post("/", booksController.createBook)

/**
 * @swagger
 * /books/detail/{code}:
 *   get:
 *     summary: Get book detail by code
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Book code
 *     responses:
 *       200:
 *         description: Book detail data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *                 message:
 *                   type: string
 *                 pagination:
 *                   type: object
 *             example:
 *               status: success
 *               statusCode: 200
 *               data:
 *                 id: "f1b707ce-d901-4d28-b9bf-f5361e05f5b6"
 *                 code: "JK-45"
 *                 title: "Harry Potter"
 *                 author: "J.K Rowling"
 *                 stock: 1
 *               message: "Get Book Data Success"
 *               pagination: {}
 */

router.get("/detail/:code", booksController.getBookByCode)

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update book data
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book has been updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *                 message:
 *                   type: string
 *                 pagination:
 *                   type: object
 *             example:
 *               status: success
 *               statusCode: 200
 *               data:
 *                 id: "4e59bd35-5c44-4493-bedf-abda40a64e92"
 *                 code: "update"
 *                 title: "update"
 *                 author: "update"
 *                 stock: 200
 *               message: "Book has been updated successfully!"
 *               pagination: {}
 */

router.put("/:id", booksController.updateBook)

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Update book stock
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Update Book Stock Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *                 message:
 *                   type: string
 *                 pagination:
 *                   type: object
 *             example:
 *               status: success
 *               statusCode: 200
 *               data:
 *                 id: "4e59bd35-5c44-4493-bedf-abda40a64e92"
 *                 code: "update"
 *                 title: "update"
 *                 author: "update"
 *                 stock: 50
 *               message: "Update Book Stock Success"
 *               pagination: {}
 */

router.patch("/:id", booksController.updateBookStock)

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete book data
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Delete Book Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 statusCode:
 *                   type: integer
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *                 message:
 *                   type: string
 *                 pagination:
 *                   type: object
 *             example:
 *               status: success
 *               statusCode: 200
 *               data:
 *                 id: "67c31b05-a2e5-4316-a3f9-b5c3c6d6453a"
 *                 code: "test"
 *                 title: "testes"
 *                 author: "testes"
 *                 stock: 20
 *               message: "Delete Book Success"
 *               pagination: {}
 */

router.delete("/:id", booksController.deleteBook);
    
module.exports = router;