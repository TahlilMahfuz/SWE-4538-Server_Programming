const express = require("express");
const router = express.Router();
const {
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo
    } = require("../controllers/todo.controller");
    
//create route for todo list
router.post("/create-todo", createTodo);
router.get("/get-todo", getTodo);
router.patch("/update-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);



module.exports = router;