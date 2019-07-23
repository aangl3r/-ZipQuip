const User = require("../models/User");
const bcrypt = require("bcrypt");

module.export = function (app) {

    //get session data
    app.get("/api/session", function (req, res) {
        console.log(req.session);
        if (!req.session.user) {
            res.status(401).send("No user is signed in on this session");
        } else {
            console.log(`Session cookie is ${req.session.user}`);
            res.send(JSON.stringify({ data: req.session }));
        }
    });

    //checks if user exists. if not, adds to db
    app.post("/api/users", function (req, res) {
        //searches db for email
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                //if email doesn't exist in db
                if (user === null) {
                    //protect pw
                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            if (err) {
                                console.log(err);
                            } else {
                                req.body.password = hash;
                                //create user in db
                                User.create(req.body, function (err, post) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(post);
                                        req.session.user = post._id;
                                    }
                                    res.sendStatus(200);
                                });
                            }
                        });
                    })
                } else if (user) {
                    res.status(401).send("This email profile already exists.");
                }
            }
        });
    });

    //sign in functions
    app.post("/api/signin", function (req, res) {
        User.findOne({ email: req.body.email }, function (err, user) {
            console.log(req.body);
            if (err) {
                console.log(err);
            } else {
                //checks if user exists in db
                if (user === null) {
                    res.sendStatus(401);
                    return;
                } else {
                    //if user exists, compare pw
                    console.log(user);
                    bcrypt.compare(req.body.password, user.password, function (
                        err,
                        result
                    ) {
                        if (err) {
                            console.log(err);
                        }
                        if (!result) {
                            res.sendStatus(401);
                            return;
                        }
                        if (result) {
                            req.session.user = user._id;
                            req.session.loc = user.zip;
                            req.session.name = user.name;
                            console.log(req.session.user);
                            res.sendStatus(200);
                        }
                    });
                }
            }
        });
    });
}