const Pool = require("../config/db");

const selectAllMembers = ({ limit, offset, sort, sortby }) => {
    return Pool.query(
        `SELECT * FROM members ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
    );
};

const selectMember = (id) => {
    return Pool.query(`SELECT * FROM members WHERE id = '${id}'`)
};

const createMember = (data) => {
    const { id, code, name, passwordHash } = data;
    return Pool.query(`INSERT INTO members(id, code, name, password) VALUES('${id}','${code}','${name}','${passwordHash}')`);
};

const findMember = (name) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM members WHERE name='${name}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    );
};

const findMemberById = (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT FROM members WHERE id ='${id}'`, (err, res) => {
            if (!err) {
                resolve(res)
            } else {
                reject(err)
            }
        })
    )
}

const countMembers = () => {
    return Pool.query(`SELECT COUNT(*) FROM members`);
};

module.exports = {
    selectAllMembers,
    createMember,
    findMember,
    countMembers,
    selectMember,
    findMemberById
};