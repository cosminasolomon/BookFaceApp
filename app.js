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

const profile = require("./models/profile");

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
app.get('/profile',(req, res) => {
    res.render('profile.ejs');
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


// app.post('/',(req, res) => {console.log(req.body);});

// app.listen(3800, () => console.log("Server Up and running 3800"));

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


// post request for editing the profile
app.post('/users/dashboard', (req, res) => {
    console.log('Hellooooooooooooooooo!')
  })


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({ storage: storage });

  app.get("/dashboard",(req,res)=>{
    res.render("dashboard");
});

  app.post("/uploadphoto",upload.single('img'),(req,res)=>{
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };
    image.create(final_img,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
});

app.post("/profile", (req, res) => {
    const { name, username, img, birthdate, city, aboutme } = req.body;
});