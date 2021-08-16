const mongoose = require("mongoose");
const { isEmail } = require("validator");
var findOrCreate = require('mongoose-findorcreate')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  lastAnswer: {
    type: Date,
    default: new Date().getTime(),
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
});

userSchema.plugin(findOrCreate)

userSchema.statics.ban = async function (email) {
  const user = await this.findOne({ email }, "isBanned");
  user.isBanned = true;
  user.save();
  console.log(user);
};

userSchema.statics.unban = async function (email) {
  const user = await this.findOne({ email }, "isBanned");
  user.isBanned = false;
  user.save();
  console.log(user);
};

const User = mongoose.model("user", userSchema);

module.exports = User;