const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const User = require("../models/user");
const { ensureAuthenticated } = require("../config/auth");

router.get("/profile", ensureAuthenticated, async (req, res) => {
  const profiles = await Profile.find({ user_id: req.user._id });
  //res.send(profile);
  res.render("profile.ejs", { profiles });
});

//profile post handle
router.post("/profiles/createprofile", async (req, res) => {
  const profile = new Profile({
    name: req.body.name,
    username: req.body.username,
    city: req.body.city,
    birthdate: req.body.birthdate,
    aboutme: req.body.aboutme,
    user_id: req.user._id,
  });
  // console.log(profile);
  // profile.author = user._id;
  try {
    await profile.save();
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
