const express = require('express');
const router = express.Router();
const {expressjwt: jwt} = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const authentiacationCtrl = require('../controllers/authentication');
const todoCtrl = require('../controllers/todo');
const userCtrl = require('../controllers/users');

// authentication routes
router.post('/register', authentiacationCtrl.register);
router.post('/login', authentiacationCtrl.login);

// todo routes
router.get('/todo', auth, todoCtrl.getTodoItems);
router.get('/todo/:todoItemId', auth, todoCtrl.getTodoItem);
router.post('/todo', auth, todoCtrl.createTodoItem);
router.put('/todo/:todoItemId', auth, todoCtrl.updateTodoItem);
router.delete('/todo/:todoItemId', auth, todoCtrl.deleteTodoItem);

// user routes
router.get('/users', auth, userCtrl.getUsers);
router.get('/users/:userId', auth, userCtrl.getUser);

router.get('/', (req, res) => {
    res.send('Welcome to the API of Just Another TODO App!');
});

module.exports = router;