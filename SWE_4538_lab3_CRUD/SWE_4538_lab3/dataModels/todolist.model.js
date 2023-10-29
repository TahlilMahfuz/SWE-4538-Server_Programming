//create a to do list model
const mongoose = require("mongoose");

const TodoListSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    });

const TodoList = mongoose.model("TodoList", TodoListSchema);

module.exports = TodoList;