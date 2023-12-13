const { Schema, model } = require('mongoose')

const schema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  refreshTokens: [{
    type: String,
    required: true,
    expireAfterSeconds: '15m'
  }]
})

module.exports = model('Token', schema)