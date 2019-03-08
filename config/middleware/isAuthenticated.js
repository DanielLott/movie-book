// This is middleware for restricting routes a fanatic is not allowed to visit if not logged in
module.exports = function (req, res, next) {
    // If the fanatic is logged in, continue with the request to the restricted route
    if (req.user) {
        return next();
    }

    // If the fanatic isn't logged in, redirect them to the login page
    return res.redirect("/");
};
