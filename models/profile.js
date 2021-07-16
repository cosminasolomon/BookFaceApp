const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  username: { type: String, required: true },
  city: { type: String, required: true },
  birthdate: { type: Date, required: true },
  aboutme: { type: String, required: true },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});
const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = { Profile, ProfileSchema };
