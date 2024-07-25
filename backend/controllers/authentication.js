const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

// register a new user
const register = async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.name || !req.body.surname) {
        return res.status(400).json({message: 'Email, password, name and surname are required'});
    }

    try {
        const existingUser = await User.findOne({email: req.body.email}).exec();

        if (existingUser) {
            return res.status(400).json({message: 'User with this email already exists'});
        }

        const user = new User();
        user.email = req.body.email;
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.type = 'user';
        user.setPassword(req.body.password);

        user.save().then((user) => {
            const token = user.generateJwt();
            return res.status(200).json({token});
        });
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

// login a user
const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({message: 'Email and password are required'});
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (user) {
            const token = user.generateJwt();
            return res.status(200).json({token});
        }
        return res.status(401).json(info);
    })(req, res);
}

// export the functions
module.exports = {
    register,
    login,
};