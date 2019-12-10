/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt-nodejs');


module.exports = {
    //add normal user
    create: function (req, res) {
        const user = req.body;
        if (!user.email) {
            return res.send("email is required");
        }

        if (!user.password) {
            return res.send("password is required");
        }

        if (user.email) {
            User.findOne({ email: user.email }).then(async (data) => {
                if (data) {
                    res.send("this mail is already exist, Please submit with another one.");
                } else {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(user.password, salt, null, function (err, hash) {
                            user.password = hash
                        });
                    });
                    try {
                        let createdUser = await User.create(user).fetch();
                        res.send(createdUser);
                    } catch (error) {
                        res.send(error)
                    }
                }
            }).catch(err => res.send(err))
        }
    },
    createAdmin: function (req, res) {
        const user = req.body;
        if (!user.email) {
            return res.send("email is required");
        }

        if (!user.password) {
            return res.send("password is required");
        }

        if (user.email) {
            User.findOne({ email: user.email }).then((data) => {
                if (data) {
                    res.send("this mail is already exist, Please submit with another one.");
                } else {
                    user.isAdmin = true
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(user.password, salt, null, async function (err, hash) {
                            user.password = hash
                            try {
                                let createdUser = await User.create(user).fetch();
                                res.send(createdUser);
                            } catch (error) {
                                res.send(error)
                            }
                        });
                    });

                }
            }).catch(err => res.send(err))
        }
    },
    login: function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        if (!(email && password)) {
            return res.send('No email or password specified!');
        }
        User.findOne({ email: email }).then(function (user) {

            if (!user) {
                return res.send('Invalid account credentials');
            }

            bcrypt.compare(password, user.password, function (err, data) {
                if (err || !data) return res.json({ msg: "Invalid account credentials", err })

                sails.helpers.jwTokenSign(user)
                    .then(token => { return res.json({ user, token }); })
                    .catch(_jwtErr => {
                        return res.json({ err: 'Could not generate token' });
                    });
            })

        }).catch(err => {
            console.log("hello ", req.body.email, "---", req.body.password);
            return res.send(err)
        });
    },
    currentUser: function (req, res) {
        return User.findById(req.id).then(user => {
            if (!user) {
                return res.sendStatus(400);
            }
            return res.send({ user, token });
        });
    },
    activeToggle: function (req, res) {
        User.findOne({ id: req.params.id })
            .then(async (user) => {
                console.log("user", user);
                let updatedUser = await User.updateOne({ id: req.params.id }).set({ isActive: !user.isActive });
                console.log("UUuser", updatedUser);
                return res.send({ updatedUser })
            }).catch(err => res.json(err));
    }
};

