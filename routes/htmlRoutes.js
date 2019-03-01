var db = require("../models");
// var path = require("path");
// // Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
      db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        examples: dbExamples
      });
    });
  });
  app.get("/user", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("userHome", {
        examples: dbExamples
      });
    });
  });
  app.get("/movies", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("movies", {
        examples: dbExamples
      });
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
