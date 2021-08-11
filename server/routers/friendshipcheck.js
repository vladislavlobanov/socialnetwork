const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/checkFriendStatus/:otherUserId", async (req, res) => {
    try {
        const results = await db.checkFriendship(
            req.session.userId,
            req.params.otherUserId
        );
        if (results.rows.length > 0) {
            results.rows[0].userId = req.session.userId;
            res.json(results.rows);
        } else res.json(results.rows);
    } catch (err) {
        console.log("Error in post /checkFriendStatus/:otherUserId:", err);
    }
});

router.post("/checkFriendStatus/", async (req, res) => {
    try {
        if (req.body.buttonText == "Send Friend Request") {
            await db.sendFriendRequest(req.session.userId, req.body.foreignId);
            return res.sendStatus(200);
        } else if (
            req.body.buttonText == "End Friendship" ||
            req.body.buttonText == "Cancel Friend Request"
        ) {
            await db.deleteFriendship(req.session.userId, req.body.foreignId);
            return res.sendStatus(200);
        } else if (req.body.buttonText == "Accept Friend Request") {
            await db.acceptFriendRequest(
                req.session.userId,
                req.body.foreignId
            );
            return res.sendStatus(200);
        }
    } catch (err) {
        console.log("Error in post /checkFriendStatus/", err);
    }
});

module.exports = router;
