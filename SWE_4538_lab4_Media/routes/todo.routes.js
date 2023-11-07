const express = require("express");
const router = express.Router();
const {
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo,
    uploadImage,
    uploadMultipleImages,
    uploadAudio,
    uploadMultipleAudios
    } = require("../controllers/todo.controller");
    
//create route for todo list
router.post("/create-todo", createTodo);
router.get("/get-todo", getTodo);
router.patch("/update-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

//import imagemiddleware
const {uploadProfileImage, uploadAudioFile} = require("../middlewares/image.middleware")

// upload images
router.post('/todo/upload/single_image', uploadProfileImage.single('image'), uploadImage);
router.post('/todo/upload/multiple_image', uploadProfileImage.array('images', 5), uploadMultipleImages);

//upload auio
router.post('/todo/upload/audio', uploadAudioFile.single('audio'), uploadAudio);
router.post('/todo/upload/multiple_audio', uploadAudioFile.array('audios', 5), uploadMultipleAudios);


module.exports = router;