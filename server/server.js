const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

const cookieSession = require("cookie-session");
const bcrypt = require("../bcrypt");
const db = require("../db");

app.use(express.json());

app.use(
    //put this one in secrets !! IMPORTANT
    cookieSession({
        secret: `SOCIALNETWORKprojectSPICED2021`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", function (req, res) {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/register", (req, res) => {
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

// this should be our last route in the server!
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
