const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, unique: true, required: true },
  author: { type: String, required: true }
})

module.exports = mongoose.model('books', bookSchema);