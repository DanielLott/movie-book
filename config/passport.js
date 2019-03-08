var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a name and password
passport.use(new LocalStrategy(
    // Our fanatic will sign in using a name
    {
        usernameField: "name"
    },
    function (name, password, done) {
        // When a fanatic tries to sign in this code runs
        db.Fanatic.findOne({
            where: {
                name: name
            }
        }).then(function (dbFanatic) {
            // If there's no fanatic with the given name
            if (!dbFanatic) {
                return done(null, false, {
                    message: "Incorrect name."
                });
            }
            // If there is a fanatic with the given name, but the password the fanatic gives us is incorrect
            else if (!dbFanatic.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            // If none of the above, return the fanatic
            return done(null, dbFanatic);
        });
    }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the fanatic
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (fanatic, cb) {
    cb(null, fanatic);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
