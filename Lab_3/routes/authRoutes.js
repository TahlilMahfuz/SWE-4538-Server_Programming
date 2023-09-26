// authRoutes.js
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

const users = [];


router.post('/signup', (req, res) => {
    const { email, username, password } = req.body;
    console.log(email, username, password);
    console.log("userlist: " + users)
  
    
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    const newUser = { email, username, password };
    users.push(newUser);
    console.log(newUser);
  
    res.status(201).json({ message: 'User created successfully' });
  });
  
  
  router.post('/login', isAuthenticated, (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
  
    const user = users.find(user => user.email === email && user.password === password);
  
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  
    res.status(200).json({ message: 'Login successful'});
  });
  
  
  router.post('/reset-password', (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
  
    const userIndex = users.findIndex(user => user.email === email);
  
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    if (users[userIndex].password !== oldPassword) {
      return res.status(401).json({ message: 'Incorrect old password' });
    }
  
    users[userIndex].password = newPassword;
  
    res.status(200).json({ message: 'Password reset successful' });
  });
  
  
  router.get('/welcome', isAuthenticated, (req, res) => {
    res.json({ message: `Welcome, ${req.user}` });
  });

module.exports = router;