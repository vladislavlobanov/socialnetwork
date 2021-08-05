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
        });
    } catch (err) {
        console.log("Error in get /user db query: ", err);
    }
});

router.post(
    "/upload",
    uploader.single("file"),
    s3.upload,
    async function (req, res) {
        try {
            const results = await db.insertProfilePic(
                req.file.filename,
                req.body.user
            );
            res.json({ imgUrl: results.rows[0].img_url });
        } catch (err) {
            console.log("Error in post /upload db query: ", err);
        }

        // db.insertImages(
        //     req.body.title,
        //     req.body.desc,
        //     req.body.username,
        //     req.file.filename
        // )
        //     .then((results) => {
        //         res.json({
        //             title: results.rows[0].title,
        //             description: results.rows[0].description,
        //             username: results.rows[0].username,
        //             url: results.rows[0].url,
        //             id: results.rows[0].id,
        //         });
        //     })
        //     .catch((err) => console.log(err));
    }
);

module.exports = router;
