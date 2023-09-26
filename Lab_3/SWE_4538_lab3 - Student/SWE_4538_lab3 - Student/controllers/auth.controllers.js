const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const fs = require('fs');
const initializePassport = require("../config/passport");

// Store users.json data in users array
let users = require('../users.json');

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

const getLogin = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "login.html");
  res.sendFile(filePath);
};

const postLogin = (req, res, next) => {
  // console.log(req.body);
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

const getLogout = async (req, res) => {
  req.logout( err => {
    if(err) return next(err);
    req.session.destroy();
    const filePath = path.join(__dirname, "..", "views", "logout.html");
    res.sendFile(filePath);
  });
};


const getRegister = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "register.html");
  res.sendFile(filePath);
};

// const postRegister = async (req, res, next) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10); // req.body.password ==> password should be exact match to register.html name=password,  10:how many time you want to generate hash. it's a standard default value
//     users.push({
//       id: Date.now().toString(),
//       name: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     });
//     res.redirect("/login");
//   } catch {
//     res.redirect("/register");
//   }
//   console.log(users); // show the user list
// };

const postRegister = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Read existing user data from the JSON file (if any)
    let usersData = [];
    try {
      const data = fs.readFileSync('users.json', 'utf-8');
      usersData = JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist or there's an error reading it, usersData will remain an empty array.
    }

    // Create a new user object
    const newUser = {
      id: Date.now().toString(),
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    // Add the new user to the existing user data
    usersData.push(newUser);

    // Write the updated user data back to the JSON file
    fs.writeFileSync('users.json', JSON.stringify(usersData, null, 2));

    // fs.writeFile('users.json', JSON.stringify(usersData), (err) => {
    //   if (err) throw err;
    //   console.log('Data written to file');
    // };

    // Redirect to the login page after successful registration
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.redirect("/register");
  }
};

module.exports = {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  getLogout,
};
