const express = require("express");
const router = express.Router();
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const register = require("./models/user");
const expressEjsLayout = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");
const fs = require("fs");
const multer = require("multer");

const Profile = require("./models/profile");
const User = require("./models/user");

app.use("/static", express.static("public"));

app.get('/',(req, res) => {
    res.render('welcome.ejs');
});
app.get('/register',(req, res) => {
    res.render('register.ejs');
});
app.get('/login',(req, res) => {
    res.render('login.ejs');
});
app.get('/dashboard',(req, res) => {
    res.render('dashboard.ejs');
});

//ejs
app.set("view engine", "ejs");
app.use(expressEjsLayout);

//BodyParser
app.use(express.urlencoded({ extended: false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })


// Routes : sign in - sign out 
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

//connection to DB 

dotenv.config();

//passport config:
require('./config/passport')(passport)

//connection to db
mongoose.set("useFindAndModify", false);

 mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
     console.log("Connected to db!");
 app.listen(3000, () => console.log("Server Up and running 3000"));
 });

 app.get("/profile", (req, res) => {
    Profile.find({} , (error, profile) => {
      res.render('profile', {
        profile: req.profile,
        user: req.user,
      })
    console.log(res)
    console.log(req)
    })
  })