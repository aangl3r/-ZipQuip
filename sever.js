//dependencies
require("dotenv").config();
const express = require("express");
const passport = require("passport");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");

//api routes
require("./routes/authRoutes")(app);
require("./routes/api-routes.js")(app);

//express-session secret
const sessionKey = process.env.CookieKey;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

//define middleware
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});
