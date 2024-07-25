const mongoose = require('mongoose');
const User = mongoose.model('User');

// get user by id
const getUser = async (req, res) => {
    if (!req.params.userId) {
        return res.status(400).json({message: 'User ID is required'});
    }

    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

// get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

// export the functions
module.exports = {
    getUser,
    getUsers,
};