const express = require("express");
const router = express.Router();
const bcrypt = require("../../bcrypt");
const db = require("../../db");

router.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

router.post("/register", (req, res) => {
    if (
        !req.body.first &&
        !req.body.last &&
        !req.body.email &&
        !req.body.password
    ) {
        res.json({ success: false, errMessage: "Please fill in all fields!" });
    }

    const emailFormat =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailFormat.test(req.body.email)) {
        res.json({
            success: false,
            errMessage: "Please provide a valid email address",
        });
    }

    bcrypt
        .hash(req.body.password)
        .then((hashPwd) => {
            return db
                .registration(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    hashPwd
                )
                .then((results) => {
                    req.session.userId = results.rows[0].id;
                    res.json({ success: true });
                });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                errMessage: "Something went wrong",
            });
        });
});

module.exports = router;
