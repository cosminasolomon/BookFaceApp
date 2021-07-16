const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
const dotenv = require("dotenv");
const expressEjsLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const fileupload = require("express-fileupload");

// const register = require("./models/user");
// const { ensureAuthenticated } = require("./config/auth");

//passport config:
require("./config/passport")(passport);

//mongoose DIOGO version
mongoose
  .connect(
    "mongodb+srv://jinane3:jinane3@bookface.wanum.mongodb.net/BookFace?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected,,"))
  .catch((err) => console.log(err));

//Cloudinary config
cloudinary.config({
  cloud_name: "dmqk246zd",
  api_key: "916155187143796",
  api_secret: "9A0ZLM0-LyLOI_HnVsqtqtzrYnw",
});

//ejs
app.set("view engine", "ejs");
app.use(expressEjsLayout);

//BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

app.use(fileupload({ useTempFiles: true }));
app.use("/static", express.static("public"));

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/profiles", require("./routes/profiles"));
app.use("/posts", require("./routes/posts"));

app.listen(3000);

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
//connection to db
// mongoose.set("useFindAndModify", false);

// mongoose.connect(
//   process.env.DB_CONNECT,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected to db!");
//     app.listen(3000, () => console.log("Server Up and running 3000"));
//   }
// );

// dotenv.config();
