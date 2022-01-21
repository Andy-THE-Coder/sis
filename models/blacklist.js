const mongoose = require('mongoose');

const blacklist = new mongoose.Schema({
_id: {type: String, required: true},
reason: {type: String, default: "none"}
})

module.exports = mongoose.model('BLACKLISTED USERS',blacklist);