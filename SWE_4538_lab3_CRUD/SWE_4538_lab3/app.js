const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // parse the body of HTTP request
const cookieParser = require("cookie-parser"); //parse cookies that are sent with HTTP request
const session = require("express-session");
const flash = require('express-flash')
const passport = require("passport");
require("./config/passport")(passport);

app.use(flash());
app.use(
  session({
    secret:"secret",
    resave: false,  // we can resave the session if nothing is change
    saveUninitialized: false,  //we can save empty value
  })
);


app.use(passport.initialize());
app.use(passport.session());

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const cors = require("cors");   //Cross-origin resource sharing (CORS) is a browser mechanism which
                                  //  enables controlled access to resources located outside of a given domain.
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Allow cookies to be sent
}));

const routes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");
app.use(routes);
app.use(todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.json({ error: err });
    } else res.redirect("/");
  });
});

const ensureAuthenticated = require("./middlewares/auth.middleware");
app.get("/welcome", ensureAuthenticated, (req, res) => {
  res.sendFile(__dirname + "/views/homePage.html");
});





//Connect to DB
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((error) => {
    console.log(error);
  });


module.exports = app;
