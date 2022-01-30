const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  name: { type: String, index: true },
  price: { type: Number, index: true },
  image: { type: String, index: true },
  category: { type: [String], index: true }
})

const category = mongoose.model('category', categorySchema)

module.exports = category
