const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

//get all todos
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const todos = await Todo.find({userId});
        res.json({data : todos});
    }catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({ message: err.message});
    }
});

//create a new todo
router.post('/:userId', async (req, res) => {
    const todo = new Todo({
        userId: req.params.userId,
        title: req.body.title,
        description: req.body.description,
    })
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    }catch (err) {
        res.status(400).json({message: err.message})
    }
});

//update a todo
router.put('/:todoId', async (req, res) => {
    try{
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.todoId, // 修正为 todoId
            { ...req.body, updatedAt: Date.now() }, // 手动更新 updatedAt，或依赖 timestamps
            { new: true } // 返回更新后的文档
        );
        res.json(updatedTodo);
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