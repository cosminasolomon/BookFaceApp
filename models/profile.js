const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: {type: String,required: true},
    username: {type: String,required: true},
    // img: {type: String,required: true},
    city: {type: String,required: true},
    birthdate: {type: Date,required: true},
    aboutme: {type: String,required: true},
    user_id: {type: String,required: true}
});
const Profile= mongoose.model('Profile',ProfileSchema);

module.exports = Profile;