//dependencies
require("dotenv").config();
const express = require("express");
const passport = require("passport");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");

//require models
require("./models/User");

//require passport
require("./passport/passport");

//api routes
require("./routes/authRoutes")(app);
require("./routes/api-routes")(app);

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

//connect to mongodb
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/zipquip";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to db!");
});

//const hour = 36000000;
app.use(
  session({
    secret: sessionKey,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    //cookie: { maxAge: hour, sameSite: true },
  })
);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});
