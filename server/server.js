const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const register = require("./routers/registrationrouter");
const cookieSession = require("cookie-session");

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

app.use(register);

// this should be our last route in the server!
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
