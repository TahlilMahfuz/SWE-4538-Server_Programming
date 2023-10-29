const TodoList = require("../dataModels/todolist.model");
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");

//create create todo
const createTodo = async (req, res) => {
    try {
      const { task } = req.body;
      const userId = req.user.id;
      console.log(userId);
      const newTodo = new TodoList({
        task,
        user: userId,
      });
      await newTodo.save();
      res.json({ message: "Todo created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  //create get todo
  const getTodo = async (req, res) => {
    try {
      const userId = req.user.id;
      const todos = await TodoList.find({ user: userId });
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  //create update todo
  const updateTodo = async (req, res) => {
    try {
      const todoId = req.params.id;
      const { task, isDone } = req.body;
      const todo = await TodoList.findById(todoId);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      todo.task = task;
      todo.isDone = isDone;
      await todo.save();
      res.json({ message: "Todo updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  //create delete todo
  const deleteTodo = async (req, res) => {
    try {
      const profileID = req.params.id;
      const profileInfo = await TodoList.findById(profileID);
      console.log(profileID);
      console.log(profileInfo);
  
      if (!profileInfo) {
        return res.status(404).json({ error: "Profile information not found" });
      }
  
      await profileInfo.deleteOne({ _id: profileID });
  
      res.json({ message: "Profile information deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  module.exports = {
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo,
  };
  