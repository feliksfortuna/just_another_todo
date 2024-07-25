const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// declarations of the schemas
const userSchema = new mongoose.Schema({});
const todoItemSchema = new mongoose.Schema({});

// schemas
userSchema.add({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    surname: {
        type: String,
        required: [true, 'Surname is required'],
    },
    hash: String,
    salt: String,
    type: {
        type: String,
        enum: ['admin', 'user'],
        required: [true, 'Type is required'],
    }
});

todoItemSchema.add({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: String,
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: [true, 'Priority is required'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
});

// methods
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

userSchema.methods.checkPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        surname: this.surname,
        type: this.type,
        exp: Number.parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
}

// indexings for optimization
todoItemSchema.index({ user: 1 });

// export the schema
module.exports = mongoose.model('User', userSchema, 'Users');