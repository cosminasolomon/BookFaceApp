const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user");
const cloudinary = require("cloudinary");

// OUR CODE

router.post("/new", async (req, res) => {
  // const newProfile = new Profile(req.body);
  // newProfile.save();
  console.log(req.body);

  try {
    const fileStr = req.files.image;
    const uploadResponse = await cloudinary.uploader.upload(
      fileStr.tempFilePath,
      {}
    );
    console.log(uploadResponse);
    const url = uploadResponse.url;
    const newProfile = new Profile({
      url: url,
      name: req.body.name,
      username: req.body.username,
      city: req.body.city,
      birthdate: req.body.birthdate,
      aboutme: req.body.aboutme,
    });
    await newProfile.save();
    await User.findOneAndUpdate({ _id: req.user._id }, { profile: newProfile });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
});

router.post("/upload-image", async (req, res) => {
  try {
    console.log(uploadResponse);
    res.json({ msg: "yaya" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.post("/search", async (req, res) => {
  console.log(req.body);
  const profiles = await Profile.find({
    username: { $regex: req.body.user_input },
  });
  res.send({ data: profiles });
});

const getUserProfileAndPosts = function (id) {
  return Profile.findById(id).populate("posts");
};

const renderProfileWithPosts = async function (id, req, res) {
  const posts = await getUserProfileAndPosts(id);
  console.log(posts);
  res.render("profile", {
    user: req.user,
    posts: posts,
  });
};

router.get("/show/:id", (req, res) => {
  renderProfileWithPosts(req.params.id, req, res);
});

module.exports = router;
