const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (username, password, done) => {
    try {
        const user = await User.findOne({email: username});
        if (!user) {
            return done(null, false, {message: 'Incorrect username.'});
        } else if (!user.checkPassword(password)) {
            return done(null, false, {message: 'Incorrect password.'});
        } else {
            return done(null, user);
        }
    } catch (err) {
        return done(err);
    }
}));