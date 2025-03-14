const Todo = require("../models/Todo");
const fetchToDos = async (req, res) => {
    try {
        const userId = req.params.userId;
        const todos = await Todo.find({userId});
        res.json({data : todos});
    }catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({ message: err.message});
    }
}

const addToDo = async (req, res) => {
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
}

const updateTodo = async (req, res) => {
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
}

const deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.todoId);
        res.json({message:'Todo deleted'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = { fetchToDos, addToDo, updateTodo, deleteTodo}