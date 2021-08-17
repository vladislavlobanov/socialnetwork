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
        `SELECT hashed_password, id FROM users
        WHERE email = ($1);`,
        [email]
    );
};

module.exports.findUserById = (id) => {
    return db.query(
        `SELECT first, last, img_url, id, bio FROM users
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
        `SELECT code FROM reset_codes
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

module.exports.updateBio = (id, bio) => {
    return db.query(
        `UPDATE users SET bio = ($2) WHERE id = ($1) RETURNING bio;`,
        [id, bio]
    );
};

module.exports.insertProfilePic = (imgName, userId) => {
    return db.query(
        `UPDATE users SET img_url = ($1) WHERE id = ($2) RETURNING img_url;`,
        ["https://s3.amazonaws.com/socialnetwork-spiced2021/" + imgName, userId]
    );
};

module.exports.lastUsers = () => {
    return db.query(
        `SELECT id, first, last, img_url FROM users
        ORDER BY id DESC
        LIMIT 3;`
    );
};

module.exports.searchUsers = (val) => {
    return db.query(
        `SELECT id, first, last, img_url FROM users 
        WHERE (first || ' ' || last) ILIKE $1  
        LIMIT 5;`,
        [val + "%"]
    );
};

module.exports.checkFriendship = (currentUserID, foreignId) => {
    return db.query(
        `SELECT * FROM friendships
  WHERE (recipient_id = $1 AND sender_id = $2)
  OR (recipient_id = $2 AND sender_id = $1);`,
        [foreignId, currentUserID]
    );
};

module.exports.sendFriendRequest = (currentUserID, foreignId) => {
    return db.query(
        `INSERT INTO friendships (recipient_id, sender_id, accepted) VALUES ($1,$2,$3);`,
        [foreignId, currentUserID, false]
    );
};

module.exports.acceptFriendRequest = (currentUserID, foreignId) => {
    return db.query(
        `UPDATE friendships SET accepted = ($3) WHERE (recipient_id = $1 AND sender_id = $2)
  OR (recipient_id = $2 AND sender_id = $1);`,
        [foreignId, currentUserID, true]
    );
};

module.exports.deleteFriendship = (currentUserID, foreignId) => {
    return db.query(
        `DELETE FROM friendships WHERE (recipient_id = $1 AND sender_id = $2)
  OR (recipient_id = $2 AND sender_id = $1);`,
        [foreignId, currentUserID]
    );
};

module.exports.friendsAndWannabees = (currentUserID) => {
    return db.query(
        `SELECT users.id, first, last, img_url, accepted
                FROM friendships
                JOIN users ON (accepted = FALSE AND recipient_id = $1 AND sender_id = users.id) OR
                (accepted = TRUE AND recipient_id = $1 AND sender_id = users.id) OR
                (accepted = TRUE AND sender_id = $1 AND recipient_id = users.id);`,
        [currentUserID]
    );
};

module.exports.getLastTenMessages = () => {
    return db.query(`
        SELECT first, last, img_url, text, created_at 
        FROM messages 
        JOIN users ON users.id = messages.user_id
        ORDER BY created_at DESC
        LIMIT 10;
    `);
};

module.exports.addMessage = (text, userId) => {
    return db.query(
        `WITH inserted AS (
        INSERT INTO messages (text, user_id) VALUES ($1,$2) RETURNING *)
        SELECT users.first, users.last, users.img_url, inserted.text, inserted.created_at
        FROM inserted
        JOIN users ON users.id = inserted.user_id
    `,
        [text, userId]
    );
};
