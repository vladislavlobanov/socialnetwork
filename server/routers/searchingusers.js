const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/api/users", async (req, res) => {
    try {
        const results = await db.lastUsers();
        res.json(results.rows);
    } catch (err) {
        console.log("Error in post /api/users db query: ", err);
    }
});

router.get("/api/search-users/:val", async (req, res) => {
    try {
        const results = await db.searchUsers(req.params.val);
        res.json(results.rows);
    } catch (err) {
        console.log("Error in post /api/search-users db query: ", err);
    }
});

module.exports = router;
