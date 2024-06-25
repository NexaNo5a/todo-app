const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

//get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
});

//create a new todo
router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        completed: req.body.completed,
    })
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    }catch (err) {
        res.status(400).json({message: err.message})
    }
});

//update a todo
router.put('/:id', async (req, res) => {
    try{
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updateTodo);
    }catch (err) {
        res.status(400).json({message: err.message})
    }
});

//delete a todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({message:'Todo deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

module.exports = router;