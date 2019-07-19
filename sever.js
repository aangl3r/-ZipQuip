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