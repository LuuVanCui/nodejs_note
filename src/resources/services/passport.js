const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const GOOGLE_CLIENT_ID = '820849889489-2l62hgnerhtneg65uuq6lbkehhfgbhg2.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'oiaSW7ok5pKyIGNz9_7TsLCi';
var userProfile;

class LoginGoogle {
    index() {
        passport.serializeUser(function(user, cb) {
            cb(null, user);
        });
        
        passport.deserializeUser(function(obj, cb) {
            cb(null, obj);
        });
        
        passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            userProfile = profile;
            return done(null, userProfile);
        }
        // ------------------------- data luu trong userProfile
        ));
    }
}

module.exports = new LoginGoogle;