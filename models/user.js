const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true
}

const string = {
  type: String,
  required: false
}

const user = mongoose.Schema({
  _id: reqString,
  stones: string,
  snowballs: string,
})

module.exports = mongoose.model("Users", user)