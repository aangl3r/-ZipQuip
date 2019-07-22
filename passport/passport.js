require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

let ClientID = process.env.ClientID;

let ClientSecret = process.env.ClientSecret;

const User = mongoose.model("User");

passport.use(
    new GoogleStrategy(
        {
            clientID: ClientID,
            clientSecret: ClientSecret,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({ googleID: profile.id })
                    .save()
                    .then(user => done(null, user));
                }
            });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

