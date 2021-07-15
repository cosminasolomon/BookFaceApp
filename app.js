const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
const dotenv = require("dotenv");
const expressEjsLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// const fs = require("fs");
// const multer = require("multer");
const register = require("./models/user");
const Profile = require("./models/profile");
const User = require("./models/user");
const { ensureAuthenticated } = require("./config/auth");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.render("welcome.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

//ejs
app.set("view engine", "ejs");
app.use(expressEjsLayout);

//BodyParser
app.use(express.urlencoded({ extended: true }));
//express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes : sign in - sign out
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/profiles", require("./routes/profiles"));

//connection to DB

dotenv.config();

//passport config:
require("./config/passport")(passport);

//connection to db
mongoose.set("useFindAndModify", false);

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running 3000"));
  }
);

// app.get("/profile", ensureAuthenticated, async (req, res) => {
//   const profiles = await Profile.find({ user_id: req.user._id });
//   //res.send(profile);
//   res.render("profile.ejs", { profiles });
// });

// //profile post handle
// app.post("/profiles/createprofile", async (req, res) => {
//   const profile = new Profile({
//     name: req.body.name,
//     username: req.body.username,
//     city: req.body.city,
//     birthdate: req.body.birthdate,
//     aboutme: req.body.aboutme,
//     // user_id: req.user._id,
//   });
//   // console.log(profile);
//   // profile.author = user._id;
//   try {
//     await profile.save();
//     res.redirect("/profile");
//   } catch (err) {
//     console.log(err);
//   }
// });
