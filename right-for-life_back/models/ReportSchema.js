const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const ReportSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    date: Number,
    title: String,
    gallery: Array,
    created: Number,
  });

ReportSchema.plugin(paginate);

module.exports = ReportSchema;