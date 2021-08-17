const express = require("express");
const app = express();
// socket
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
// socket end
const compression = require("compression");
const path = require("path");
const registerLogin = require("./routers/registrationlogin");
const user = require("./routers/userdata");
const searchingusers = require("./routers/searchingusers");
const friendshipcheck = require("./routers/friendshipcheck");
const cookieSession = require("cookie-session");
const secrets = require("./secrets");
const db = require("../db.js");

const cookieSessionMiddleware = cookieSession({
    secret: secrets.cookiePwd,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});
app.use(cookieSessionMiddleware);

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.static("./uploads"));
app.use(express.json());

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

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

io.on("connection", async function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;

    const { rows } = await db.getLastTenMessages();
    socket.emit("lastMessages", rows);
    socket.on("newMessage", (data) => console.log(data));
});
