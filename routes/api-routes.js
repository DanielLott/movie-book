// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app, jsonParser, urlencodedParser) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the home page.
  // Otherwise the user will be sent an error
  app.post("/api/login", urlencodedParser, passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the home page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    console.log(req.user.id);
    res.json("/home");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize Fanatic Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", jsonParser, function(req, res) {
    console.log(req.body);
    db.Fanatic.create({
      name: req.body.name,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's name (and id?)
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name
        ,id: req.user.id
      });
    }
  });

  // Route for adding movie to seen
  app.post("/api/addMovie", jsonParser, function(req, res) {
    console.log(req.body);
    db.Movie.create(req.body).then(function() {
      console.log("Added movie to DB");
      //res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  app.get("/api/getMovies", jsonParser, function(req, res) {
    var query = {};
    console.log("Fetching movies ", req.query);
    if (req.query.FanaticId) {
      query.FanaticId = req.query.FanaticId;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Movie.findAll({
      where: query
    }).then(function(dbMovies) {
      console.log("Returning movies" + dbMovies);
      res.json(dbMovies);
    });
  });

};