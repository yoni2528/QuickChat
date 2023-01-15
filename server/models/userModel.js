const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "a user most have email"],
    validate: [validator.isEmail, "Invalid email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "a user most have password"],
    select: false,
    min: 6,
    max: 20,
  },
  passwordConfirm: {
    type: String,
    required: [true, "a user most have password"],
    validate: {
      validator: function (passConfirm) {
        return this.password === passConfirm;
      },
      message: "passowrds must match",
    },
  },
  nickName: {
    type: String,
    default: "John Doe",
  },
  image: {
    type: String,
    default: "avatar1",
  },
});

userSchema.pre("save", async function (next) {
  const newPass = await bcrypt.hash(this.password, 11);
  this.password = newPass;
  this.passwordConfirm = undefined;
  next();
});

// eslint-disable-next-line prefer-arrow-callback
userSchema.pre(/^find/, async function (next) {
  next();
});

module.exports = mongoose.model("User", userSchema);
