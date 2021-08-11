const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const registerLogin = require("./routers/registrationlogin");
const user = require("./routers/userdata");
const searchingusers = require("./routers/searchingusers");
const friendshipcheck = require("./routers/friendshipcheck");
const cookieSession = require("cookie-session");
const secrets = require("./secrets");

app.use(express.static("./uploads"));
app.use(express.json());

app.use(
    cookieSession({
        secret: secrets.cookiePwd,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(registerLogin);
app.use(user);
app.use(searchingusers);
app.use(friendshipcheck);

// this should be our last route in the server!
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
