const { createMember, findMember, countMembers, selectAllMembers, selectMember, findMemberById } = require("../models/member");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");

const membersController = {
    getAllMembers: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const sortby = req.query.sortby || "code";
            const sort = req.query.sort || "ASC";

            let result = await selectAllMembers({ limit, offset, sort, sortby });

            const membersWithoutPassword = result.rows.map(member => {
                const { password, ...memberWithoutPassword } = member;
                return memberWithoutPassword;
            });

            const {
                rows: [count],
            } = await countMembers();
            const totalData = parseInt(count.count);
            const totalPage = Math.ceil(totalData / limit);
            const pagination = {
                currentPage: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage,
            };
            commonHelper.response(
                res,
                membersWithoutPassword,
                200,
                "Get Members Data Success",
                pagination
            );
        } catch (err) {
            console.log(err);
            return commonHelper.response(res, null, 404, err);
        }
    },
    registerMember: async (req, res) => {
        try {
            const { code, name, password } = req.body;
            const { rowCount } = await findMember(name);
            if (rowCount) {
                return res.json({ messege: "Username is already taken" });
            }

            const passwordHash = bcrypt.hashSync(password);
            const id = uuidv4();
            const data = {
                id,
                code,
                name,
                passwordHash,
                penalty_until: null
            };
            createMember(data)
                .then((result) => {
                    commonHelper.response(res, result.rows, 201, "Member created successfully!");
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
            return commonHelper.response(res, null, 401, error);
        }
    },
    loginMember: async (req, res) => {
        try {
            const { name, password } = req.body;
            const {
                rows: [member],
            } = await findMember(name);

            if (!member) {
                return res.json({ messege: "Name is incorrect" });
            }

            const validPassword = bcrypt.compareSync(password, member.password);
            if (!validPassword) {
                return res.json({ messege: "Password is incorrect" });
            }

            delete member.password;
            const payload = {
                member_name: member.name
            };

            member.token = authHelper.generateToken(payload);
            member.refreshToken = authHelper.refreshToken(payload);
            commonHelper.response(res, member, 201, "Login successful!");
        } catch (err) {
            console.log(err);
            return commonHelper.response(res, null, 400, err);
        }
    },

    profile: async (req, res) => {
        const memberId = String(req.params.id);
        const { rowCount } = await findMemberById(memberId);

        if (!rowCount) {
            return res.json({ message: "Profile is not found" });
        }

        delete password;
        selectMember(memberId)
            .then(
                result => {
                    const membersWithoutPassword = result.rows.map(member => {
                        const { password, ...memberWithoutPassword } = member;
                        return memberWithoutPassword;
                    });
                    commonHelper.response(res, membersWithoutPassword, 200, "Get Profile's data successfully")
                }
            )
            .catch(
                err => res.send(err)
            )
    },

    refreshToken: (req, res) => {
        const RefreshToken = req.body.refreshToken;
        const decoded = jwt.verify(RefreshToken, process.env.SECRET_JWT_KEY);
        const payload = {
            member_name: decoded.name
        };
        const result = {
            token: authHelper.generateToken(payload),
            refreshToken: authHelper.refreshToken(payload),
        };
        commonHelper.response(res, result, 200, "Token has refreshed");
    },
};

module.exports = membersController;