const mongoose = require('mongoose');
const TodoItem = mongoose.model('TodoItem');

// get all to-do items by user
const getTodoItems = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        const todoItems = await TodoItem.find({user: req.user._id});
        return res.status(200).json(todoItems);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

// get to-do item by id
const getTodoItem = async (req, res) => {
    if (!req.params.todoItemId) {
        return res.status(400).json({message: 'Todo item ID is required'});
    }

    try {
        const todoItem = await TodoItem.findById(req.params.todoItemId);
        if (!todoItem) {
            return res.status(404).json({message: 'Todo item not found'});
        }
        return res.status(200).json(todoItem);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

// create a new to-do item
const createTodoItem = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({message: 'Title is required'});
    }

    try {
        const todoItem = new TodoItem();
        todoItem.title = req.body.title;
        todoItem.user = req.user._id;

        if (req.body.description) {
            todoItem.description = req.body.description;
        }
        if (req.body.dueDate) {
            todoItem.dueDate = req.body.dueDate;
        }
        if (req.body.priority) {
            todoItem.priority = req.body.priority;
        }

        todoItem.save().then((todoItem) => {
            return res.status(200).json(todoItem);
        });
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

// update a to-do item
const updateTodoItem = async (req, res) => {
    if (!req.params.todoItemId) {
        return res.status(400).json({message: 'Todo item ID is required'});
    }

    try {
        const todoItem = await TodoItem.findById(req.params.todoItemId);
        if (!todoItem) {
            return res.status(404).json({message: 'Todo item not found'});
        }

        if (req.body.title) {
            todoItem.title = req.body.title;
        }
        if (req.body.description) {
            todoItem.description = req.body.description;
        }
        if (req.body.dueDate) {
            todoItem.dueDate = req.body.dueDate;
        }
        if (req.body.priority) {
            todoItem.priority = req.body.priority;
        }
        if (req.body.completed) {
            todoItem.completed = req.body.completed;
        }

        todoItem.save().then((todoItem) => {
            return res.status(200).json(todoItem);
        });
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

// delete a to-do item
const deleteTodoItem = async (req, res) => {
    if (!req.params.todoItemId) {
        return res.status(400).json({message: 'Todo item ID is required'});
    }

    try {
        const todoItem = await TodoItem.findById(req.params.todoItemId);
        if (!todoItem) {
            return res.status(404).json({message: 'Todo item not found'});
        }

        todoItem.remove().then(() => {
            return res.status(200).json({message: 'Todo item deleted'});
        });
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

// export the functions
module.exports = {
    getTodoItems,
    getTodoItem,
    createTodoItem,
    updateTodoItem,
    deleteTodoItem,
};