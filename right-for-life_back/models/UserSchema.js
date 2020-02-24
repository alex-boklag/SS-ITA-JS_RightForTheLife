const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, match: /[a-zA-Z0-9_\-.]+@[a-zA-Z]{1}[a-zA-Z.]+/g },
    password: { type: String, required: true, match: /[\w\W]{8,}/g },
    username: { type: String, required: true },
  });

module.exports = UserSchema;