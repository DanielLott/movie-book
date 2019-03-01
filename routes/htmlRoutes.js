var db = require("../models");
// var path = require("path");
// // Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        examples: dbExamples
      });
    });
  });
  app.get("/user", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("userHome", {
        examples: dbExamples
      });
    });
  });
  app.get("/movies", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("movies", {
        examples: dbExamples
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
