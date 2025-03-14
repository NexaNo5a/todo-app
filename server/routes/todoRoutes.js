const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const {fetchToDos, addToDo, updateTodo, deleteTodo} = require("../controllers/todoController");
const {errorHandler} = require("../middleware/errorHandler");

router.get('/:userId', fetchToDos);
router.post('/:userId', addToDo);
router.put('/:todoId', updateTodo);
router.delete('/:todoId', deleteTodo);
router.use(errorHandler);
module.exports = router;