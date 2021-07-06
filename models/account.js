const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    content: {type: String,required: true},
    date: {type: Date,default: Date.now}
});

module.exports = mongoose.model('account',accountSchema);