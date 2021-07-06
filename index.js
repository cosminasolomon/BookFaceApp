const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const account = require("./models/account");

app.use("/static", express.static("public"));

app.get('/',(req, res) => {
    res.render('index.ejs');
});
app.get('/account',(req, res) => {
    res.render('account.ejs');
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.post('/',(req, res) => {console.log(req.body);});

app.listen(3800, () => console.log("Server Up and running"));

// sign in - sign out 
// const userRoutes = require('./routes/user');
// const stuffRoutes = require('./routes/stuff');

// app.use('/api/stuff', stuffRoutes);

// app.use('/api/auth', userRoutes);

//connection to DB 

dotenv.config();


//connection to db
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
app.listen(3000, () => console.log("Server Up and running"));
});

//POST METHOD
app.post('/',async (req, res) => {
    const accountPOST = new accountPOST({content: req.body.content});
    try {await accountPOST.save();res.redirect("/account");} catch (err) {res.redirect("/account");}
});