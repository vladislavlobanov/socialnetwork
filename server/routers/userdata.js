const express = require("express");
const router = express.Router();
const db = require("../../db");

const { s3, uploader } = require("../middleware");

router.get("/user", async (req, res) => {
    try {
        const results = await db.findUserById(req.session.userId);
        res.json({
            first: results.rows[0].first,
            last: results.rows[0].last,
            profileImg: results.rows[0].img_url,
            userId: results.rows[0].id,
            bio: results.rows[0].bio,
        });
    } catch (err) {
        console.log("Error in get /user db query: ", err);
    }
});

router.get("/user/:id.json", async (req, res) => {
    try {
        if (req.session.userId == req.params.id) {
            return res.json({
                success: false,
            });
        }

        const results = await db.findUserById(req.params.id);
        res.json({
            first: results.rows[0].first,
            last: results.rows[0].last,
            profileImg: results.rows[0].img_url,
            userId: results.rows[0].id,
            bio: results.rows[0].bio,
            success: true,
        });
    } catch (err) {
        console.log("Error in get /user db query: ", err);
        res.json({
            success: false,
        });
    }
});

router.post(
    "/upload",
    uploader.single("file"),
    s3.upload,
    async function (req, res) {
        try {
            const results = await db.insertProfilePic(
                `user/${req.session.userId}/` + req.file.filename,
                req.body.user
            );
            res.json({ imgUrl: results.rows[0].img_url });
        } catch (err) {
            console.log("Error in post /upload db query: ", err);
        }
    }
);

router.post("/api/delete", s3.delete, async function (req, res) {
    try {
        res.sendStatus(200);
    } catch (err) {
        console.log("Error in post /delete db query: ", err);
    }
});

router.post("/updatebio", async (req, res) => {
    try {
        const results = await db.updateBio(req.body.id, req.body.bio);

        res.json({ bio: results.rows[0].bio });
    } catch (err) {
        console.log("Error in post /updatebio db query: ", err);
    }
});

router.get("/api/logout", (req, res) => {
    req.session = null;
    res.sendStatus(200);
});

module.exports = router;
