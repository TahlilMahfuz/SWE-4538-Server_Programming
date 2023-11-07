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

//create upload image path from req.file to TodoList images
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const photo = req.file.filename;

    const userId = req.user.id;
    const todo = await TodoList.findOne({ user: userId }); 

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (photo) {
      todo.images = photo;
      await todo.save(); // Save the updated todo
      console.log("Image uploaded successfully");
      res.json({ message: "Profile image updated successfully" });
    } else {
      res.json({ message: "No image found to upload" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create upload multiple image path from req.file to TodoList images
const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const photo = req.files.map((file) => file.filename);

    const userId = req.user.id;
    const todo = await TodoList.findOne({ user: userId });
   
    if (photo) {
      todo.images = photo
    }
    await todo.save();

    res.json({ message: 'Multiple images updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create upload multiple audio path from req.file to TodoList audio 
const uploadAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const audio = req.file.filename;

    const userId = req.user.id;
    const todo = await TodoList.findOne({ user: userId }); 

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (audio) {
      todo.audio = audio;
      await todo.save(); // Save the updated todo
      console.log("Audio uploaded successfully");
      res.json({ message: "Audio updated successfully" });
    } else {
      res.json({ message: "No audio file found to upload" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadMultipleAudios = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const audio = req.files.map((file) => file.filename);

    const userId = req.user.id;
    const todo = await TodoList.findOne({ user: userId });
   
    if (audio) {
      todo.audio = audio;
    }
    await todo.save();

    res.json({ message: 'Multiple audios updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  uploadImage,
  uploadMultipleImages,
  uploadAudio,
  uploadMultipleAudios
};
  