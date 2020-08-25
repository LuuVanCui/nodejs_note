const passport = require('passport');


class AuthController {
    // [GET] /auth/google/callback
    googleCallback(req, res, next) {
        passport.authenticate('google', { failureRedirect: '/error' }),
        function(req, res) {
            // Successful authentication, redirect success.
            res.redirect('/success');  
        } 
    }

    // [GET] /auth/google
    google() {
        passport.authenticate('google', { scope : ['profile', 'email'] });
    }
}

module.exports = new AuthController;
