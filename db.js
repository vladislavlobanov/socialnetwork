var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.registration = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, hashed_password) VALUES ($1,$2,$3,$4) RETURNING id;`,
        [first, last, email, password]
    );
};

module.exports.findUser = (email) => {
    return db.query(
        `SELECT * FROM users
        WHERE email = ($1);`,
        [email]
    );
};

module.exports.findUserById = (id) => {
    return db.query(
        `SELECT * FROM users
        WHERE id = ($1);`,
        [id]
    );
};

module.exports.insertCode = (emailData, codeData) => {
    return db.query(`INSERT INTO reset_codes (email, code) VALUES ($1,$2);`, [
        emailData,
        codeData,
    ]);
};

module.exports.selectCodes = (emailData) => {
    return db.query(
        `SELECT * FROM reset_codes
        WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes' AND  email = ($1);`,
        [emailData]
    );
};

module.exports.updatePassword = (emailData, hashedPwd) => {
    return db.query(
        `UPDATE users SET hashed_password = ($2) WHERE email = ($1);`,
        [emailData, hashedPwd]
    );
};

module.exports.insertProfilePic = (imgName, userId) => {
    return db.query(
        `UPDATE users SET img_url = ($1) WHERE id = ($2) RETURNING img_url;`,
        ["https://s3.amazonaws.com/socialnetwork-spiced2021/" + imgName, userId]
    );
};
