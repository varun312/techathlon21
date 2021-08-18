const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discordUsername: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  level: {
    type: Number,
    required: true,
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

// fire a function before doc saved to db
// userSchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

userSchema.statics.ban = async function (username) {
  const user = await this.findOne({ username }, "isBanned");
  user.isBanned = true;
  user.save();
  console.log(user);
};

userSchema.statics.unban = async function (username) {
  const user = await this.findOne({ username }, "isBanned");
  user.isBanned = false;
  user.save();
  console.log(user);
};

const User = mongoose.model("user", userSchema);

module.exports = User;