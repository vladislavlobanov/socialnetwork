const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/user", async (req, res) => {
    try {
        const results = await db.findUserById(req.session.userId);
        res.json({
            first: results.rows[0].first,
            last: results.rows[0].last,
            profileImg: results.rows[0].img_url,
        });
    } catch (err) {
        console.log("Error in get /user db query: ", err);
    }
});

module.exports = router;
