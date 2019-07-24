const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = app => {
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
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if (err) {
                            console.log(err);
                        } else {
                            req.body.password = hash;
                            // Then add to db
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
                    // Otherwise escape
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
    //update user info
    app.put("/api/users", function (req, res) {
        const userUpdate = {
            name: req.body.name,
            email: req.body.email,
            zip: req.body.zip,
        };
        if (!req.session.user) {
            res.sendStatus(401);
            return;
        } else {
            if (
                userUpdate.name === undefined ||
                userUpdate.email === undefined ||
                userUpdate.zip === undefined
            ) {
                console.log("Empty data!");
                res.sendStatus(401);
            }
            User.update({ _id: req.body.userId }, userUpdate, function (err, user) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log(user);
                    res.sendStatus(200);
                }
            });
        }
    });
    //update user pw
    app.put("/api/users/password", function (req, res) {
        if (!req.session.user) {
            res.sendStatus(401);
            return;
        } else {
            User.findOne({ _id: req.body.userId }, function (err, user) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log(user);
                    bcrypt.compare(req.body.password, user.password, function (
                        err,
                        result
                    ) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else if (!result) {
                            console.log(result);
                            res.sendStatus(401);
                        } else if (result) {
                            let newPassword = "";
                            bcrypt.hash(req.body.newPassword, 10, function (err, hash) {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                } else {
                                    newPassword = hash;
                                }
                            });
                            User.updateOne(
                                { _id: req.body.userId },
                                { password: newPassword },
                                function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(500);
                                    } else {
                                        console.log(result);
                                        res.sendStatus(200);
                                    }
                                }
                            );
                        }
                    });
                }
            });
        }
    });
}