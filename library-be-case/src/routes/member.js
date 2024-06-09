const express = require("express");
const router = express.Router();
const membersController = require("../controllers/member");
const { protect } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         penalty_until:
 *           type: date
 *       example:
 *         id: "1"
 *         code: "M001"
 *         name: "John Doe"
 *         penalty_until: null
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Retrieve a list of members
 *     tags: [Members]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A list of members
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
 *                     $ref: '#/components/schemas/Member'
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
 *                 - id: "07e686fa-76b8-4abf-9107-a7ea74f64ee7"
 *                   code: "M001"
 *                   name: "Angga"
 *                   penalty_until: null
 *                 - id: "0c1eb45f-df28-474b-bcff-6424e8ce6c5f"
 *                   code: "M002"
 *                   name: "Ferry"
 *                   penalty_until: null
 *                 - id: "1a7f0588-9ead-4f51-b5b5-0f5709c6b1ed"
 *                   code: "M003"
 *                   name: "Putri"
 *                   penalty_until: null
 *               message: "Get Members Data Success"
 *               pagination:
 *                 currentPage: 1
 *                 limit: 10
 *                 totalData: 3
 *                 totalPage: 1
 */
router.get("/", membersController.getAllMembers);

/**
 * @swagger
 * /members/register:
 *   post:
 *     summary: Register a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member created successfully
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
 *                   items: {}
 *                 message:
 *                   type: string
 *                 pagination:
 *                   type: object
 *             example:
 *               status: success
 *               statusCode: 201
 *               data: []
 *               message: Member created successfully!
 *               pagination: {}
 *       400:
 *         description: Invalid input
 */
router.post("/register", membersController.registerMember);

/**
 * @swagger
 * /members/login:
 *   post:
 *     summary: Log in a member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Token created
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     code:
 *                       type: string
 *                     name:
 *                       type: string
 *                     penalty_until:
 *                       type: string
 *                     token:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *                 message:
 *                   type: string
 *                 pagination:
 *                   type: object
 *             example:
 *               status: success
 *               statusCode: 201
 *               data:
 *                 id: "07e686fa-76b8-4abf-9107-a7ea74f64ee7"
 *                 code: "M001"
 *                 name: "Angga"
 *                 penalty_until: null
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJfbmFtZSI6IkFuZ2dhIiwiaWF0IjoxNzE3OTE4MjYxLCJleHAiOjE3MTc5MjE4NjEsImlzcyI6ImxpYnJhcnkifQ.cxGJNoi0lLZ3knavPi19kLLXxJazj2tnDGIf3jWsr8c"
 *                 refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJfbmFtZSI6IkFuZ2dhIiwiaWF0IjoxNzE3OTE4MjYxLCJleHAiOjE3MTc5MjkwNjEsImlzcyI6ImxpYnJhcnkifQ.N2k6vgxl03W1VPXH8uImhSF55PQBxlttubah7yTvczU"
 *               message: "Login successful!"
 *               pagination: {}
 *       400:
 *         description: Invalid input
 */
router.post("/login", membersController.loginMember);

/**
 * @swagger
 * /members/profile/{id}:
 *   get:
 *     summary: Get member profile by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Member ID
 *     responses:
 *       200:
 *         description: Member profile data
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
 *                     $ref: '#/components/schemas/Member'
 *                 message:
 *                   type: string
 *                 pagination:
 *                   type: object
 *             example:
 *               status: success
 *               statusCode: 200
 *               data:
 *                 - id: "0c1eb45f-df28-474b-bcff-6424e8ce6c5f"
 *                   code: "M002"
 *                   name: "Ferry"
 *                   penalty_until: null
 *               message: Get Profile's data successfully
 *               pagination: {}
 *       404:
 *         description: Member not found
 */
router.get("/profile/:id", protect, membersController.profile);

/**
 * @swagger
 * /members/refreshToken:
 *   post:
 *     summary: Refresh token
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token has been refreshed
 */
router.post("/refreshToken", membersController.refreshToken);

module.exports = router;
