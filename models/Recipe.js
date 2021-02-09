const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  // from: {type: String, required: true},
  // to: {type: String, required: true, unique: true},
  title: {type: String, required: true, unique: true},
  description: {type: String, required: true},
  date: {type: Date, default: Date.now},
  image: {type: Image},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Recipe', schema);