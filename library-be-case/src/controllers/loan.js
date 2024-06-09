const { v4: uuidv4 } = require("uuid");
const {
    createLoan,
    updateLoan,
    findLoan,
    countActiveLoans,
    findActiveLoanByBook,
    getAllBooks,
    getAllAvailableBooks,
    getAllMembers,
    getAllLoansWithDetails
} = require("../models/loan");
const { findMemberById } = require("../models/member");

const loanController = {
    borrowBook: async (req, res) => {
        const { memberId, bookId } = req.body;

        try {
            const member = await findMemberById(memberId);

            if (!member.rows.length) {
                return res.status(404).json({ message: "Member not found" });
            }

            if (member.rows[0].penalty_until && new Date(member.rows[0].penalty_until) >= new Date()) {
                return res.status(403).json({ message: "Member is penalized" });
            }

            const activeLoans = await countActiveLoans(memberId);

            if (parseInt(activeLoans.rows[0].count) >= 2) {
                return res.status(403).json({ message: "Member cannot borrow more than 2 books" });
            }

            const activeLoanByBook = await findActiveLoanByBook(bookId);

            if (activeLoanByBook.rows.length) {
                return res.status(403).json({ message: "Book is already borrowed by another member" });
            }

            const newLoan = {
                id: uuidv4(),
                member_id: memberId,
                book_id: bookId,
                loan_date: new Date().toISOString(),
            };

            await createLoan(newLoan);
            res.status(201).json({ message: "Book borrowed successfully", loan: newLoan });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    returnBook: async (req, res) => {
        const { memberId, bookId } = req.body;

        try {
            const loan = await findLoan(memberId, bookId);

            if (!loan.rows.length) {
                return res.status(404).json({ message: "Loan not found" });
            }

            const loanDate = new Date(loan.rows[0].loan_date);
            const returnDate = new Date();
            const diffTime = Math.abs(returnDate - loanDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const updateData = {
                id: loan.rows[0].id,
                return_date: returnDate.toISOString(),
                is_returned: true,
            };

            await updateLoan(updateData);

            if (diffDays > 7) {
                await Pool.query(
                    `UPDATE members SET penalty_until=NOW() + INTERVAL '3 days' WHERE id='${memberId}'`
                );
            }

            res.status(200).json({ message: "Book returned successfully" });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    checkBooks: async (req, res) => {
        try {
            const books = await getAllAvailableBooks();
            res.status(200).json(books.rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    checkMembers: async (req, res) => {
        try {
            const members = await getAllMembers();
            res.status(200).json(members.rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllLoans: async (req, res) => {
        try {
            const loans = await getAllLoansWithDetails();
            res.status(200).json(loans.rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = loanController;