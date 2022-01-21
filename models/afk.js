const mongoose = require('mongoose');

const afks = new mongoose.Schema({
_id: {type: String, required: true},
time: {type: Number},
message: {type: String, default: "AFK"}
})

module.exports = mongoose.model('AFK USERS',afks);