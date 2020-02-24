const mongoose = require('mongoose');

const SuppliesSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    info: String,
    type: String,
  });

module.exports = SuppliesSchema;