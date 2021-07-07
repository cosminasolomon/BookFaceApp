const express = require("express");
const router = express.Router();
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const account = require("./models/account");
const expressEjsLayout = require('express-ejs-layouts');

app.use("/static", express.static("public"));

app.get('/',(req, res) => {
    res.render('index.ejs');
});
app.get('/account',(req, res) => {
    res.render('account.ejs');
});
app.get('/login',(req, res) => {
    res.render('login.ejs');
});
app.get('/profile',(req, res) => {
    res.render('profile.ejs');
});

//ejs
app.set("view engine", "ejs");
app.use(expressEjsLayout);

app.use(express.urlencoded({ extended: false}));

app.post('/',(req, res) => {console.log(req.body);});

app.listen(3800, () => console.log("Server Up and running"));

// Routes : sign in - sign out 
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

//connection to DB 

dotenv.config();


//connection to db
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to db!");
app.listen(3000, () => console.log("Server Up and running"));
});

//POST METHOD
app.post('/account',async (req, res) => {
    console.log(req.body)
    const accountPOST = new account(req.body);
    try {await accountPOST.save();res.redirect("/account");} catch (err) {res.redirect("/account");}
});



