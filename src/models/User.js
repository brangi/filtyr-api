const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    select: false,
  },
  fbId: {
    type: String,
  },
},{timestamps: true});

export const User =  mongoose.model("User", UserSchema);
